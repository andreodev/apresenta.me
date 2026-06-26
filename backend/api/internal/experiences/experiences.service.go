package experiences

import (
	"context"
	"errors"
	"strings"
)

type Service struct {
	repository *Repository
}

func NewService(repository *Repository) *Service {
	return &Service{repository: repository}
}

func (s *Service) Create(
	ctx context.Context,
	input CreateExperienceInput,
) (*Experience, error) {
	input.CurriculumID = strings.TrimSpace(input.CurriculumID)
	input.Company = strings.TrimSpace(input.Company)
	input.Position = strings.TrimSpace(input.Position)
	input.StartDate = strings.TrimSpace(input.StartDate)
	input.EndDate = strings.TrimSpace(input.EndDate)
	input.Description = strings.TrimSpace(input.Description)

	if input.CurriculumID == "" {
		return nil, errors.New("curriculum_id é obrigatório")
	}

	if input.Company == "" {
		return nil, errors.New("empresa é obrigatória")
	}

	if input.Position == "" {
		return nil, errors.New("cargo é obrigatório")
	}

	if input.StartDate == "" {
		return nil, errors.New("data de início é obrigatória")
	}

	if input.Description == "" {
		return nil, errors.New("descrição é obrigatória")
	}

	experience := &Experience{
		CurriculumID: input.CurriculumID,
		Company:      input.Company,
		Position:     input.Position,
		StartDate:    input.StartDate,
		EndDate:      input.EndDate,
		Description:  input.Description,
		SortOrder:    input.SortOrder,
	}

	err := s.repository.Create(ctx, experience)
	if err != nil {
		return nil, err
	}

	return experience, nil
}

func (s *Service) ListByCurriculumID(
	ctx context.Context,
	curriculumID string,
) ([]Experience, error) {
	curriculumID = strings.TrimSpace(curriculumID)

	if curriculumID == "" {
		return nil, errors.New("curriculum_id é obrigatório")
	}

	return s.repository.ListByCurriculumID(ctx, curriculumID)
}
