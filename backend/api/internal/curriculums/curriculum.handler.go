package curriculums

import (
	"api/internal/auth"
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) Create(w http.ResponseWriter, r *http.Request) {
	var input CreateCurriculumInput

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "JSON inválido", http.StatusBadRequest)
		return
	}

	claims, ok := r.Context().Value(auth.UserContextKey).(*auth.Claims)
	if !ok || claims.User_id == uuid.Nil {
		http.Error(w, "usuário autenticado não encontrado", http.StatusUnauthorized)
		return
	}

	// Em rota privada, o dono do currículo vem do JWT validado pelo middleware.
	// Assim o frontend não consegue criar um currículo usando o user_id de outra pessoa.
	input.User_id = claims.User_id

	curriculum, err := h.service.Create(r.Context(), input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(curriculum)
}

func (h *Handler) ListMine(w http.ResponseWriter, r *http.Request) {
	claims, ok := r.Context().Value(auth.UserContextKey).(*auth.Claims)
	if !ok || claims.User_id == uuid.Nil {
		http.Error(w, "usuário autenticado não encontrado", http.StatusUnauthorized)
		return
	}

	// O middleware já validou o token e colocou as claims no contexto.
	// Por isso esta rota lista sempre os currículos do usuário logado.
	curriculums, err := h.service.ListByUser_id(r.Context(), claims.User_id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(curriculums)
}

func (h *Handler) Get(w http.ResponseWriter, r *http.Request) {
	user_id := chi.URLParam(r, "user_id")

	curriculum, err := h.service.Get(r.Context(), user_id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(curriculum)
}

func (h *Handler) GetCurriculumById(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		http.Error(w, "ID inválido", http.StatusBadRequest)
		return
	}

	curriculum, err := h.service.GetCurriculumById(r.Context(), id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(curriculum)
}

func (h *Handler) Delete(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		http.Error(w, "ID inválido", http.StatusBadRequest)
		return
	}

	err = h.service.Delete(r.Context(), id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
