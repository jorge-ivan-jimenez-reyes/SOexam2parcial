package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"mi-servidor-go/database"
)

type Handlers struct {
	DB database.Database
}

func NewHandlers(db database.Database) *Handlers {
	return &Handlers{DB: db}
}

func (h *Handlers) HandleCreateSpaceMission(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var mission database.SpaceMission
	err := json.NewDecoder(r.Body).Decode(&mission)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	err = h.DB.CreateSpaceMission(&mission)
	if err != nil {
		http.Error(w, "Error creating space mission", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(mission)
}

func (h *Handlers) HandleGetSpaceMission(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Extract the ID from the URL path
	parts := strings.Split(r.URL.Path, "/")
	if len(parts) != 3 {
		http.Error(w, "Invalid URL", http.StatusBadRequest)
		return
	}

	idStr := parts[2]
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid space mission ID", http.StatusBadRequest)
		return
	}

	mission, err := h.DB.GetSpaceMission(id)
	if err != nil {
		http.Error(w, "Space mission not found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(mission)
}

func (h *Handlers) HandleUpdateSpaceMission(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Extract the ID from the URL path
	parts := strings.Split(r.URL.Path, "/")
	if len(parts) != 3 {
		http.Error(w, "Invalid URL", http.StatusBadRequest)
		return
	}

	idStr := parts[2]
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid space mission ID", http.StatusBadRequest)
		return
	}

	var mission database.SpaceMission
	err = json.NewDecoder(r.Body).Decode(&mission)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	mission.ID = id
	err = h.DB.UpdateSpaceMission(&mission)
	if err != nil {
		http.Error(w, "Error updating space mission", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(mission)
}

func (h *Handlers) HandleDeleteSpaceMission(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Extract the ID from the URL path
	parts := strings.Split(r.URL.Path, "/")
	if len(parts) != 3 {
		http.Error(w, "Invalid URL", http.StatusBadRequest)
		return
	}

	idStr := parts[2]
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid space mission ID", http.StatusBadRequest)
		return
	}

	err = h.DB.DeleteSpaceMission(id)
	if err != nil {
		http.Error(w, "Error deleting space mission", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *Handlers) HandleListSpaceMissions(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	missions, err := h.DB.ListSpaceMissions()
	if err != nil {
		http.Error(w, "Error listing space missions", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(missions)
}

func (h *Handlers) HandleHome(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Welcome to the Space Missions API!")
}
