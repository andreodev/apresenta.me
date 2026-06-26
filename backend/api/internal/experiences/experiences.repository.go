package experiences

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository struct {
	db *pgxpool.Pool
}

func NewRepository(db *pgxpool.Pool) *Repository {
	return &Repository{db: db}
}

func (r *Repository) Create(
	ctx context.Context,
	experience *Experience,
) error {
	query := `
		INSERT INTO curriculum_experiences (
			curriculum_id,
			company,
			position,
			start_date,
			end_date,
			description,
			sort_order
		)
		VALUES ($1,$2,$3,$4,$5,$6,$7)
		RETURNING id, created_at, updated_at
	`

	return r.db.QueryRow(
		ctx,
		query,
		experience.CurriculumID,
		experience.Company,
		experience.Position,
		experience.StartDate,
		experience.EndDate,
		experience.Description,
		experience.SortOrder,
	).Scan(
		&experience.ID,
		&experience.CreatedAt,
		&experience.UpdatedAt,
	)
}

func (r *Repository) ListByCurriculumID(
	ctx context.Context,
	curriculumID string,
) ([]Experience, error) {
	query := `
		SELECT
			id,
			curriculum_id,
			company,
			position,
			start_date,
			end_date,
			description,
			sort_order,
			created_at,
			updated_at
		FROM curriculum_experiences
		WHERE curriculum_id = $1
		ORDER BY sort_order ASC, created_at DESC
	`

	rows, err := r.db.Query(ctx, query, curriculumID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	experiences := []Experience{}

	for rows.Next() {
		var experience Experience

		err := rows.Scan(
			&experience.ID,
			&experience.CurriculumID,
			&experience.Company,
			&experience.Position,
			&experience.StartDate,
			&experience.EndDate,
			&experience.Description,
			&experience.SortOrder,
			&experience.CreatedAt,
			&experience.UpdatedAt,
		)

		if err != nil {
			return nil, err
		}

		experiences = append(experiences, experience)
	}

	return experiences, nil
}
