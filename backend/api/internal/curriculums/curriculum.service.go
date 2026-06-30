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
	input.User_id = (input.User_id)
	input.Slug = strings.ToLower(strings.TrimSpace(input.Slug))
	input.FullName = strings.TrimSpace(input.FullName)

	if input.User_id == uuid.Nil {
		return nil, errors.New("User_id é obrigatório")
	}

	if input.Slug == "" {
		return nil, errors.New("slug é obrigatório")
	}

	if input.FullName == "" {
		return nil, errors.New("nome completo é obrigatório")
	}

	curriculum := &Curriculum{
		User_id:      input.User_id,
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

func (s *Service) ListByUser_id(ctx context.Context, User_id uuid.UUID) ([]Curriculum, error) {
	if User_id == uuid.Nil {
		return nil, errors.New("User_id é obrigatório")
	}

	return s.repository.ListByUser_id(ctx, User_id)
}

func (s *Service) Get(ctx context.Context, user_id string) (*Curriculum, error) {
	user_id = strings.TrimSpace(user_id)

	if user_id == "" {
		return nil, errors.New("user_id is required")
	}

	return s.repository.Get(ctx, user_id)
}

func (s *Service) GetCurriculumById(ctx context.Context, id uuid.UUID) (*Curriculum, error) {
	if id == uuid.Nil {
		return nil, errors.New("id is required")
	}

	return s.repository.GetCurriculumById(ctx, id)
}

func (s *Service) Delete(ctx context.Context, id uuid.UUID) error {

	if id == uuid.Nil {
		return errors.New("id is required")
	}

	return s.repository.Delete(ctx, id)
}
