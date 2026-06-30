package auth

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

type Claims struct {
	User_id uuid.UUID `json:"User_id"`
	Email   string    `json:"email"`
	jwt.RegisteredClaims
}

func GenerateJWT(User_id uuid.UUID, email string) (string, error) {
	secret := []byte(os.Getenv("JWT_SECRET"))

	claims := Claims{
		User_id: User_id,
		Email:   email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString(secret)
}

func ValidateJWT(tokenString string) (*Claims, error) {
	secret := []byte(os.Getenv("JWT_SECRET"))

	if len(secret) == 0 {
		return nil, errors.New("JWT_SECRET não configurado")
	}

	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		if token.Method != jwt.SigningMethodHS256 {
			return nil, errors.New("método de assinatura inválido")
		}

		return secret, nil
	})

	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(*Claims)
	if !ok || !token.Valid {
		return nil, errors.New("token inválido")
	}

	if claims.User_id == uuid.Nil {
		return nil, errors.New("token sem User_id")
	}

	return claims, nil
}
