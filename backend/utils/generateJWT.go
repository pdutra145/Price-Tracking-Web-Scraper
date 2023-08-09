package utils

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

func generateToken(username string, privateKey []byte) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour)

	claims := &jwt.StandardClaims{
		Subject:   username,
		ExpiresAt: expirationTime.Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodRS256, claims)

	rsaPrivateKey, err := jwt.ParseRSAPrivateKeyFromPEM(privateKey)
	if err != nil {
		return "", err
	}

	tokenString, err := token.SignedString(rsaPrivateKey)

	return tokenString, err
}
