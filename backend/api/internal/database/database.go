package database

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

func ConnectToDatabase(databaseURL string) (*pgxpool.Pool, error) {
	return pgxpool.New(context.Background(), databaseURL)
}
