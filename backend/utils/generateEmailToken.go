package utils

import (
	"crypto/rand"
	"encoding/hex"
)

func GenerateToken() string {
    b := make([]byte, 16)  // Adjust size as needed.
    rand.Read(b)
    return hex.EncodeToString(b)
}