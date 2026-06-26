package auth

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

type Claims struct {
	UserID uuid.UUID `json:"userId"`
	Email  string    `json:"email"`
	jwt.RegisteredClaims
}

func GenerateJWT(userID uuid.UUID, email string) (string, error) {
	secret := []byte(os.Getenv("JWT_SECRET"))

	claims := Claims{
		UserID: userID,
		Email:  email,
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

	if claims.UserID == uuid.Nil {
		return nil, errors.New("token sem userId")
	}

	return claims, nil
}
