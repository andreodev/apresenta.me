package users

import (
	"context"
	"errors"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

type Service struct {
	repository *UserRepository
}

func NewService(repository *UserRepository) *Service {
	return &Service{repository: repository}
}

func (s *Service) CreateUser(ctx context.Context, input *CreateUserInput) (*User, error) {
	input.Name = strings.TrimSpace(input.Name)
	input.Email = strings.TrimSpace(input.Email)

	if input.Name == "" {
		return nil, errors.New("name is required")
	}
	if input.Email == "" {
		return nil, errors.New("email is required")
	}
	if input.Password == "" {
		return nil, errors.New("password is required")
	}

	passwordHash, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	user := &User{
		Name:         input.Name,
		Email:        input.Email,
		PasswordHash: string(passwordHash),
	}

	err = s.repository.Create(ctx, user)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *Service) Login(
	ctx context.Context,
	input LoginInput,
) (*User, error) {

	user, err := s.repository.GetByEmail(
		ctx,
		input.Email,
	)

	if err != nil {
		return nil, errors.New("credenciais inválidas")
	}

	err = bcrypt.CompareHashAndPassword(
		[]byte(user.PasswordHash),
		[]byte(input.Password),
	)

	if err != nil {
		return nil, errors.New("credenciais inválidas")
	}

	return user, nil
}
