package curriculums

import (
	"time"

	"github.com/google/uuid"
)

type Curriculum struct {
	ID           uuid.UUID `json:"id"`
	User_id      uuid.UUID `json:"user_id"`
	Slug         string    `json:"slug"`
	FullName     string    `json:"full_name"`
	Headline     string    `json:"headline"`
	About        string    `json:"about"`
	Phone        string    `json:"phone"`
	City         string    `json:"city"`
	State        string    `json:"state"`
	LinkedinURL  string    `json:"linkedin_url"`
	PortfolioURL string    `json:"portfolio_url"`
	GithubURL    string    `json:"github_url"`
	PdfURL       *string   `json:"pdf_url"`
	IsPublic     bool      `json:"is_public"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

type CreateCurriculumInput struct {
	User_id      uuid.UUID `json:"user_id"`
	Slug         string    `json:"slug"`
	FullName     string    `json:"full_name"`
	Headline     string    `json:"headline"`
	About        string    `json:"about"`
	Phone        string    `json:"phone"`
	City         string    `json:"city"`
	State        string    `json:"state"`
	LinkedinURL  string    `json:"linkedin_url"`
	PortfolioURL string    `json:"portfolio_url"`
	GithubURL    string    `json:"github_url"`
	PdfURL       *string   `json:"pdf_url"`
	IsPublic     bool      `json:"is_public"`
}
