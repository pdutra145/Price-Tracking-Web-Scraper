package controllers

import (
	"bytes"
	"fmt"
	"log"
	"pricetracker/db"
	"pricetracker/utils"

	"encoding/json"
	"io"
	"math/rand"
	"net/http"

	"github.com/gin-gonic/gin"
	// "github.com/joho/godotenv"
)

// func init() {
// 	godotenv.Load(".env")
// }

func updateUserData(userData db.User) db.User {
	var newUser db.User

	database.Where("email = ?", userData.Email).First(&newUser)

	newUser.Name = userData.Name
	newUser.Email = userData.Email
	newUser.Picture = userData.Picture
	newUser.AccessToken = userData.AccessToken
	newUser.EmailConfirmed = userData.EmailConfirmed
	newUser.AuthProvider = userData.AuthProvider

	if newUser.Username == "" {
		newUser.Username = GenerateUsername(userData.Name)
	}

	database.Save(&newUser)

	return newUser
}

func LoginHandler(c *gin.Context) {
	var data LoginBody

	c.BindJSON(&data)

	encryptedPwd := utils.EncryptText(data.Password)

	var user db.User

	result := database.Where("email = ?", data.Email).First(&user)

	if user.Password == encryptedPwd {
		handleError(result.Error, http.StatusBadRequest, c)
	}

	c.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("User %s is authenticated", user.Name), "user": user})
}

func userExists(username string) bool {
	var count int64
	database.Where("username = ?", username).Count(&count)
	return count > 0

}

func GenerateUsername(name string) string {
	var exists bool = true
	var username string

	for exists {
		num := rand.Int()

		username = name + "#" + fmt.Sprint(num)

		exists = userExists(username)
	}
	return username
}

func CreateUserHandler(c *gin.Context) {
	var userData db.User
	var newUser db.User

	c.BindJSON(&userData)

	database.Where("email = ?", userData.Email).First(&newUser)

	newUser.Name = userData.Name
	newUser.Email = userData.Email
	newUser.Username = GenerateUsername(userData.Name)
	newUser.Picture = userData.Picture
	newUser.Password = utils.EncryptText(userData.Password)

	emailReq := SendEmailRequest{
		Sender: EmailerInfo{
			Name:  "Price Tracker",
			Email: "pricetracker@gmail.com",
		},
		To: EmailerInfo{
			Name:  userData.Name,
			Email: userData.Email,
		},
		Subject: "Email Confirmation",
		Content: ContentInfo{
			Title:   "Confirm Your Email",
			Message: fmt.Sprintf("Hello %s! You need to confirm your email.", userData.Name),
		},
	}

	database.Save(&newUser)

	SendEmail(emailReq)

	c.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("User %s was registered to DB", userData.Name), "user": newUser})
}

func GoogleCallbackHandler(c *gin.Context) {
	var userData db.User

	c.BindJSON(&userData)

	newUser := updateUserData(userData)

	fmt.Println("Sending JSON")
	c.JSON(http.StatusOK, gin.H{"message": "Successfull Auth", "user": newUser})
}

func SendEmail(emailReq SendEmailRequest) {
	entrypoint := "http://scraper:3001/send_email"

	marshaledData, err := json.Marshal(emailReq)
	if err != nil {
		log.Fatalf("Unable to Marshal email Req data")
	}

	res, err := http.Post(entrypoint, "application/json", bytes.NewBuffer(marshaledData))
	if err != nil {
		log.Fatalf("Unable to post to: %s", entrypoint)

	}

	defer res.Body.Close()
	body, err := io.ReadAll(res.Body)
	if err != nil {
		log.Fatalf("Unable to read body of %s", entrypoint)

		return
	}

	var responseBody interface{}
	if err := json.Unmarshal(body, &responseBody); err != nil {
		log.Fatalf("Unable to Unmarshal body of %s", entrypoint)

		return
	}

	if res.StatusCode != 200 {
		log.Fatalf("Bad Status Code %d", res.StatusCode)

	}
}
