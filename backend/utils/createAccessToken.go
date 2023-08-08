package utils

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"io"
)

func encrypt(key, plaintext []byte) ([]byte, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	nonce := make([]byte, 12) // standard nonce length for GCM
	if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
		return nil, err
	}

	aesgcm, err := cipher.NewGCM(block)
	if err != nil {
		return nil, err
	}

	ciphertext := aesgcm.Seal(nil, nonce, plaintext, nil)
	return append(nonce, ciphertext...), nil
}

func CreateAccessToken(password string) {
	key := []byte("a very secret key") // This should be a 16-byte (for AES-128), 24-byte (for AES-192), or 32-byte (for AES-256) long secret key

	plaintext := []byte(password)

	// 3. Encrypt the token
	ciphertext, err := encrypt(key, plaintext)
	if err != nil {
		panic(err)
	}

	// 4. Optionally encode the encrypted token
	encodedCiphertext := base64.StdEncoding.EncodeToString(ciphertext)
	fmt.Println("Encrypted and encoded token:", encodedCiphertext)
}