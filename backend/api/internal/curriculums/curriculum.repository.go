package curriculums

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository struct {
	db *pgxpool.Pool
}

func NewRepository(db *pgxpool.Pool) *Repository {
	return &Repository{db: db}
}

func (r *Repository) Create(ctx context.Context, curriculum *Curriculum) error {
	query := `
		INSERT INTO curriculums (
			user_id,
			slug,
			full_name,
			headline,
			about,
			phone,
			city,
			state,
			linkedin_url,
			github_url,
			portfolio_url
		)
		VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
		RETURNING id, pdf_url, is_public, created_at, updated_at
	`

	return r.db.QueryRow(
		ctx,
		query,
		curriculum.User_id,
		curriculum.Slug,
		curriculum.FullName,
		curriculum.Headline,
		curriculum.About,
		curriculum.Phone,
		curriculum.City,
		curriculum.State,
		curriculum.LinkedinURL,
		curriculum.GithubURL,
		curriculum.PortfolioURL,
	).Scan(
		&curriculum.ID,
		&curriculum.PdfURL,
		&curriculum.IsPublic,
		&curriculum.CreatedAt,
		&curriculum.UpdatedAt,
	)
}

func (r *Repository) ListByUser_id(ctx context.Context, User_id uuid.UUID) ([]Curriculum, error) {
	query := `
		SELECT
			id,
			user_id,
			slug,
			full_name,
			headline,
			about,
			phone,
			city,
			state,
			linkedin_url,
			github_url,
			portfolio_url,
			pdf_url,
			is_public,
			created_at,
			updated_at
		FROM curriculums
		WHERE user_id = $1
		ORDER BY created_at DESC
	`

	rows, err := r.db.Query(ctx, query, User_id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	curriculums := []Curriculum{}

	for rows.Next() {
		var curriculum Curriculum

		err := rows.Scan(
			&curriculum.ID,
			&curriculum.User_id,
			&curriculum.Slug,
			&curriculum.FullName,
			&curriculum.Headline,
			&curriculum.About,
			&curriculum.Phone,
			&curriculum.City,
			&curriculum.State,
			&curriculum.LinkedinURL,
			&curriculum.GithubURL,
			&curriculum.PortfolioURL,
			&curriculum.PdfURL,
			&curriculum.IsPublic,
			&curriculum.CreatedAt,
			&curriculum.UpdatedAt,
		)

		if err != nil {
			return nil, err
		}

		curriculums = append(curriculums, curriculum)
	}

	return curriculums, nil
}

func (r *Repository) Get(ctx context.Context, user_id string) (*Curriculum, error) {
	query := `
		SELECT id, 
		slug, 
		full_name, 
		headline, 
		about, 
		phone, 
		city, 
		state, 
		linkedin_url, 
		github_url, 
		portfolio_url, 
		created_at, 
		updated_at 
		from curriculums 
		WHERE 
		user_id = $1
	`

	var curriculum Curriculum

	err := r.db.QueryRow(ctx, query, user_id).Scan(
		&curriculum.ID,
		&curriculum.Slug,
		&curriculum.FullName,
		&curriculum.Headline,
		&curriculum.About,
		&curriculum.Phone,
		&curriculum.City,
		&curriculum.State,
		&curriculum.LinkedinURL,
		&curriculum.GithubURL,
		&curriculum.PortfolioURL,
		&curriculum.CreatedAt,
		&curriculum.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	return &curriculum, nil
}

func (r *Repository) GetCurriculumById(ctx context.Context, id uuid.UUID) (*Curriculum, error) {
	query := `
		SELECT 
			id, 
			user_id, 
			slug, 
			full_name, 
			headline, 
			about, 
			phone, 
			city, 
			state, 
			linkedin_url, 
			github_url, 
			portfolio_url, 
			pdf_url, 
			is_public, 
			created_at, 
			updated_at 
		FROM curriculums 
		WHERE id = $1 
	`

	var curriculum Curriculum

	err := r.db.QueryRow(ctx, query, id).Scan(
		&curriculum.ID,
		&curriculum.User_id,
		&curriculum.Slug,
		&curriculum.FullName,
		&curriculum.Headline,
		&curriculum.About,
		&curriculum.Phone,
		&curriculum.City,
		&curriculum.State,
		&curriculum.LinkedinURL,
		&curriculum.GithubURL,
		&curriculum.PortfolioURL,
		&curriculum.PdfURL,
		&curriculum.IsPublic,
		&curriculum.CreatedAt,
		&curriculum.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	return &curriculum, nil
}

func (r *Repository) Delete(ctx context.Context, id uuid.UUID) error {
	query := `
	 DELETE FROM curriculums WHERE id = $1
	`

	_, err := r.db.Exec(ctx, query, id)

	if err != nil {
		return err
	}

	return nil
}
