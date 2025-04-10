package database

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

type SpaceMission struct {
	ID          int
	Name        string
	Destination string
	LaunchDate  string
	Status      string
}

type Database interface {
	CreateSpaceMission(mission *SpaceMission) error
	GetSpaceMission(id int) (*SpaceMission, error)
	UpdateSpaceMission(mission *SpaceMission) error
	DeleteSpaceMission(id int) error
	ListSpaceMissions() ([]*SpaceMission, error)
	Close() error
}

type PostgresDB struct {
	DB *sql.DB
}

func NewPostgresDB(host string, port int, user, password, dbname string) (*PostgresDB, error) {
	connStr := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, fmt.Errorf("error opening database connection: %w", err)
	}

	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("error connecting to the database: %w", err)
	}

	if err := createSpaceMissionsTable(db); err != nil {
		return nil, fmt.Errorf("error creating space_missions table: %w", err)
	}

	return &PostgresDB{DB: db}, nil
}

func createSpaceMissionsTable(db *sql.DB) error {
	_, err := db.Exec(`
		CREATE TABLE IF NOT EXISTS space_missions (
			id SERIAL PRIMARY KEY,
			name TEXT NOT NULL,
			destination TEXT NOT NULL,
			launch_date TEXT NOT NULL,
			status TEXT NOT NULL
		)
	`)
	return err
}

func (pdb *PostgresDB) CreateSpaceMission(mission *SpaceMission) error {
	query := `INSERT INTO space_missions (name, destination, launch_date, status) VALUES ($1, $2, $3, $4) RETURNING id`
	return pdb.DB.QueryRow(query, mission.Name, mission.Destination, mission.LaunchDate, mission.Status).Scan(&mission.ID)
}

func (pdb *PostgresDB) GetSpaceMission(id int) (*SpaceMission, error) {
	query := `SELECT id, name, destination, launch_date, status FROM space_missions WHERE id = $1`
	mission := &SpaceMission{}
	err := pdb.DB.QueryRow(query, id).Scan(&mission.ID, &mission.Name, &mission.Destination, &mission.LaunchDate, &mission.Status)
	if err != nil {
		return nil, err
	}
	return mission, nil
}

func (pdb *PostgresDB) UpdateSpaceMission(mission *SpaceMission) error {
	query := `UPDATE space_missions SET name = $1, destination = $2, launch_date = $3, status = $4 WHERE id = $5`
	_, err := pdb.DB.Exec(query, mission.Name, mission.Destination, mission.LaunchDate, mission.Status, mission.ID)
	return err
}

func (pdb *PostgresDB) DeleteSpaceMission(id int) error {
	query := `DELETE FROM space_missions WHERE id = $1`
	_, err := pdb.DB.Exec(query, id)
	return err
}

func (pdb *PostgresDB) ListSpaceMissions() ([]*SpaceMission, error) {
	query := `SELECT id, name, destination, launch_date, status FROM space_missions`
	rows, err := pdb.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var missions []*SpaceMission
	for rows.Next() {
		mission := &SpaceMission{}
		if err := rows.Scan(&mission.ID, &mission.Name, &mission.Destination, &mission.LaunchDate, &mission.Status); err != nil {
			return nil, err
		}
		missions = append(missions, mission)
	}
	return missions, nil
}

func (pdb *PostgresDB) Close() error {
	return pdb.DB.Close()
}
