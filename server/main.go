package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"mi-servidor-go/database"
	"mi-servidor-go/handlers"

	"github.com/rs/cors"
)

// Database connection configuration
const (
	host     = "db"
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

	// Create a new CORS handler
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost", "http://localhost:80"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"*"},
		Debug:          true,
	})

	// Create a new ServeMux
	mux := http.NewServeMux()

	// Add routes to the new ServeMux
	mux.HandleFunc("/", h.HandleHome)
	mux.HandleFunc("/space-missions", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			h.HandleListSpaceMissions(w, r)
		case http.MethodPost:
			h.HandleCreateSpaceMission(w, r)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})
	mux.HandleFunc("/space-missions/", func(w http.ResponseWriter, r *http.Request) {
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

	// Wrap the ServeMux with the CORS handler
	handler := c.Handler(mux)

	fmt.Println("Server listening on http://localhost:8080")
	if err := http.ListenAndServe(":8080", handler); err != nil {
		log.Fatal("Error starting the server:", err)
	}
}
