package curriculums

import (
	"context"
	"errors"
	"strings"

	"github.com/google/uuid"
)

type Service struct {
	repository *Repository
}

func NewService(repository *Repository) *Service {
	return &Service{repository: repository}
}

func (s *Service) Create(ctx context.Context, input CreateCurriculumInput) (*Curriculum, error) {
	input.UserID = (input.UserID)
	input.Slug = strings.ToLower(strings.TrimSpace(input.Slug))
	input.FullName = strings.TrimSpace(input.FullName)

	if input.UserID == uuid.Nil {
		return nil, errors.New("userId é obrigatório")
	}

	if input.Slug == "" {
		return nil, errors.New("slug é obrigatório")
	}

	if input.FullName == "" {
		return nil, errors.New("nome completo é obrigatório")
	}

	curriculum := &Curriculum{
		UserID:       input.UserID,
		Slug:         input.Slug,
		FullName:     input.FullName,
		Headline:     strings.TrimSpace(input.Headline),
		About:        strings.TrimSpace(input.About),
		Phone:        strings.TrimSpace(input.Phone),
		City:         strings.TrimSpace(input.City),
		State:        strings.TrimSpace(input.State),
		LinkedinURL:  strings.TrimSpace(input.LinkedinURL),
		GithubURL:    strings.TrimSpace(input.GithubURL),
		PortfolioURL: strings.TrimSpace(input.PortfolioURL),
	}

	err := s.repository.Create(ctx, curriculum)
	if err != nil {
		return nil, err
	}

	return curriculum, nil
}

func (s *Service) ListByUserID(ctx context.Context, userID string) ([]Curriculum, error) {
	userID = strings.TrimSpace(userID)

	if userID == "" {
		return nil, errors.New("userId é obrigatório")
	}

	return s.repository.ListByUserID(ctx, userID)
}
