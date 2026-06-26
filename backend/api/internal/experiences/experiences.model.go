package experiences

import "time"

type Experience struct {
	ID           string    `json:"id"`
	CurriculumID string    `json:"curriculum_id"`
	Company      string    `json:"company"`
	Position     string    `json:"position"`
	StartDate    string    `json:"start_date"`
	EndDate      string    `json:"end_date"`
	Description  string    `json:"description"`
	SortOrder    int       `json:"sort_order"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

type CreateExperienceInput struct {
	CurriculumID string `json:"curriculum_id"`
	Company      string `json:"company"`
	Position     string `json:"position"`
	StartDate    string `json:"start_date"`
	EndDate      string `json:"end_date"`
	Description  string `json:"description"`
	SortOrder    int    `json:"sort_order"`
}
