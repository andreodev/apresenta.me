package auth

import (
	"context"
	"log"
	"net/http"
	"strings"
)

type ContextKey string

const UserContextKey ContextKey = "user"

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")

		log.Println("Authorization:", authHeader)

		if authHeader == "" {
			http.Error(w, "token não informado", http.StatusUnauthorized)
			return
		}

		if !strings.HasPrefix(authHeader, "Bearer ") {
			http.Error(w, "formato do token inválido", http.StatusUnauthorized)
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")

		claims, err := ValidateJWT(tokenString)
		if err != nil {
			log.Println("Erro ao validar JWT:", err)
			http.Error(w, "token inválido ou expirado", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), UserContextKey, claims)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
