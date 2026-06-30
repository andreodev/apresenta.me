package main

import (
	"context"
	"log"
	"net/http"

	"api/internal/config"
	"api/internal/curriculums"
	"api/internal/database"
	"api/internal/experiences"
	"api/internal/routes"
	"api/internal/users"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
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

	experienceRepository := experiences.NewRepository(db)
	experienceService := experiences.NewService(experienceRepository)
	experienceHandler := experiences.NewHandler(experienceService)

	r := chi.NewRouter()

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{
			"http://localhost:3000",
		},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	routes.Register(r, routes.Handlers{
		UserHandler:       userHandler,
		CurriculumHandler: curriculumHandler,
		ExperienceHandler: experienceHandler,
	})

	log.Printf("Servidor iniciado na porta %s", cfg.Port)

	if err := http.ListenAndServe(":"+cfg.Port, r); err != nil {
		log.Fatal(err)
	}
}
