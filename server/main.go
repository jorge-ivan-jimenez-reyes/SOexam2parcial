package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"mi-servidor-go/database"
	"mi-servidor-go/handlers"
)

// Database connection configuration
const (
	host     = "postgres"
	port     = 5432
	user     = "admin"
	password = "admin"
	dbname   = "go_base"
)

func waitForDB(db *database.PostgresDB) error {
	var err error
	for i := 0; i < 10; i++ { // 10 intentos
		err = db.DB.Ping()
		if err == nil {
			return nil
		}
		log.Println("Esperando a que la base de datos esté lista...")
		time.Sleep(2 * time.Second) // Esperar 2 segundos
	}
	return err
}

func main() {
	// Initialize database connection
	db, err := database.NewPostgresDB(host, port, user, password, dbname)
	if err != nil {
		log.Fatal("Error connecting to the database:", err)
	}
	defer db.Close()

	// Wait for the database to be ready
	if err := waitForDB(db); err != nil {
		log.Fatal("Database not available:", err)
	}

	fmt.Println("Connected to PostgreSQL!")

	// Initialize handlers
	h := handlers.NewHandlers(db)

	// Set up routes
	http.HandleFunc("/", h.HandleHome)
	http.HandleFunc("/space-missions", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			h.HandleListSpaceMissions(w, r)
		case http.MethodPost:
			h.HandleCreateSpaceMission(w, r)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})
	http.HandleFunc("/space-missions/", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			h.HandleGetSpaceMission(w, r)
		case http.MethodPut:
			h.HandleUpdateSpaceMission(w, r)
		case http.MethodDelete:
			h.HandleDeleteSpaceMission(w, r)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	fmt.Println("Server listening on http://localhost:8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("Error starting the server:", err)
	}
}
