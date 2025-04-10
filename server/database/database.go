package database

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

type Task struct {
	ID          int
	Title       string
	Description string
}

type Database interface {
	CreateTask(task *Task) error
	GetTask(id int) (*Task, error)
	UpdateTask(task *Task) error
	DeleteTask(id int) error
	ListTasks() ([]*Task, error)
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

	if err := createTasksTable(db); err != nil {
		return nil, fmt.Errorf("error creating tasks table: %w", err)
	}

	return &PostgresDB{DB: db}, nil
}

func createTasksTable(db *sql.DB) error {
	_, err := db.Exec(`
		CREATE TABLE IF NOT EXISTS tasks (
			id SERIAL PRIMARY KEY,
			title TEXT NOT NULL,
			description TEXT
		)
	`)
	return err
}

func (pdb *PostgresDB) CreateTask(task *Task) error {
	query := `INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING id`
	return pdb.DB.QueryRow(query, task.Title, task.Description).Scan(&task.ID)
}

func (pdb *PostgresDB) GetTask(id int) (*Task, error) {
	query := `SELECT id, title, description FROM tasks WHERE id = $1`
	task := &Task{}
	err := pdb.DB.QueryRow(query, id).Scan(&task.ID, &task.Title, &task.Description)
	if err != nil {
		return nil, err
	}
	return task, nil
}

func (pdb *PostgresDB) UpdateTask(task *Task) error {
	query := `UPDATE tasks SET title = $1, description = $2 WHERE id = $3`
	_, err := pdb.DB.Exec(query, task.Title, task.Description, task.ID)
	return err
}

func (pdb *PostgresDB) DeleteTask(id int) error {
	query := `DELETE FROM tasks WHERE id = $1`
	_, err := pdb.DB.Exec(query, id)
	return err
}

func (pdb *PostgresDB) ListTasks() ([]*Task, error) {
	query := `SELECT id, title, description FROM tasks`
	rows, err := pdb.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tasks []*Task
	for rows.Next() {
		task := &Task{}
		if err := rows.Scan(&task.ID, &task.Title, &task.Description); err != nil {
			return nil, err
		}
		tasks = append(tasks, task)
	}
	return tasks, nil
}

func (pdb *PostgresDB) Close() error {
	return pdb.DB.Close()
}
