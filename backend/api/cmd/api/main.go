package main

import (
	"context"
	"log"
	"net/http"

	"api/internal/config"
	"api/internal/curriculums"
	"api/internal/database"
	"api/internal/routes"
	"api/internal/users"

	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()

	cfg := config.LoadConfig()

	db, err := database.ConnectToDatabase(cfg.DatabaseURL)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	if err := db.Ping(context.Background()); err != nil {
		log.Fatal(err)
	}

	userRepository := users.NewUserRepository(db)
	userService := users.NewService(userRepository)
	userHandler := users.NewHandler(userService)

	curriculumRepository := curriculums.NewRepository(db)
	curriculumService := curriculums.NewService(curriculumRepository)
	curriculumHandler := curriculums.NewHandler(curriculumService)

	r := chi.NewRouter()

	routes.Register(r, routes.Handlers{
		UserHandler:       userHandler,
		CurriculumHandler: curriculumHandler,
	})

	log.Printf("Servidor iniciado na porta %s", cfg.Port)

	if err := http.ListenAndServe(":"+cfg.Port, r); err != nil {
		log.Fatal(err)
	}
}
