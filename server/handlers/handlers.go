package handlers

import (
	"fmt"
	"net/http"

	"mi-servidor-go/database"
)

type Handlers struct {
	DB database.Database
}

func NewHandlers(db database.Database) *Handlers {
	return &Handlers{DB: db}
}

func (h *Handlers) HandleGet(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	fmt.Fprintln(w, "Hello, you've made a GET request!")
}

func (h *Handlers) HandleDBQuery(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	currentTime, err := h.DB.QueryTime()
	if err != nil {
		http.Error(w, "Error querying the database", http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "Current time in the database: %s\n", currentTime)
}
