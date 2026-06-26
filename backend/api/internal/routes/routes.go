package routes

import (
	"api/internal/auth"
	"api/internal/users"
	"net/http"

	"github.com/go-chi/chi/v5"
)

type Handlers struct {
	UserHandler *users.Handler
}

func Register(r chi.Router, handlers Handlers) {
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("API Online 🚀"))
	})

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	})

	r.Route("/auth/users", func(r chi.Router) {
		r.Post("/register", handlers.UserHandler.Create)
		r.Post("/login", handlers.UserHandler.Login)
	})

	r.Group(func(r chi.Router) {
		r.Use(auth.AuthMiddleware)

		r.Get("/me", func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("rota privada funcionando"))
		})
	})
}
