package database

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

type Database interface {
	QueryTime() (string, error)
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

	return &PostgresDB{DB: db}, nil
}

func (pdb *PostgresDB) QueryTime() (string, error) {
	var currentTime string
	err := pdb.DB.QueryRow("SELECT NOW()").Scan(&currentTime)
	if err != nil {
		return "", fmt.Errorf("error querying time: %w", err)
	}
	return currentTime, nil
}

func (pdb *PostgresDB) Close() error {
	return pdb.DB.Close()
}
