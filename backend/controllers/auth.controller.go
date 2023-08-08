package controllers

import (
	"bytes"
	"fmt"
	"pricetracker/db"
	"pricetracker/utils"

	"encoding/json"
	"io"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	// "github.com/joho/godotenv"
)

// func init() {
// 	godotenv.Load(".env")
// }

type EmailerInfo struct {
	Name string `json:"name"`
	Email string `json:"email"`
}

type ContentInfo struct {
	Title string `json:"title"`
	Message string `json:"message"`
}

type SendEmailRequest struct {
	Sender EmailerInfo `json:"sender"`
	To EmailerInfo `json:"to"`
	Subject string `json:"subject"`
	Content ContentInfo `json:"content"`
}

type AuthHandlerBody struct {
	db.User
	Password string `json:"password"`
}

// func getUserData(res *http.Response, c *gin.Context) db.User {
// 	defer res.Body.Close()

// 	contents, err := io.ReadAll(res.Body)

// 	if err != nil {
// 		log.Printf("Unable to read body: %s", err.Error())
// 		c.Redirect(http.StatusBadRequest, "/")
// 	}

// 	var userData db.User

// 	err = json.Unmarshal(contents, &userData)

// 	if err != nil {
// 		log.Printf("Unable to read body: %s", err.Error())
// 		c.Redirect(http.StatusBadRequest, "/")
// 	}

// 	return userData
// }

func updateUserData(userData AuthHandlerBody) db.User {
	var newUser db.User

	database := db.ConnectDB()

	database.Where("email = ?", userData.Email).First(&newUser)

	newUser.Name = userData.Name
	newUser.Email = userData.Email
	newUser.Picture = userData.Picture
	newUser.AccessToken = userData.AccessToken
	newUser.EmailConfirmed = userData.EmailConfirmed

	database.Save(&newUser)

	return newUser
}

func CallbackHandler(c *gin.Context) {
	var userData AuthHandlerBody

	c.BindJSON(&userData)

	newUser := updateUserData(userData)

	if !newUser.EmailConfirmed {
		emailReq := SendEmailRequest{
			Sender: EmailerInfo{
				Name: "Price Tracker"
				Email: "pricetracker@gmail.com"
			}
			To: EmailerInfo{
				Name: userData.Name
				Email: userData.Email
			}
			Subject: "Email Confirmation"
			Content: ContentInfo{
				Title:"Confirm Your Email"
				Message: fmt.SprintF("Hello %s! You need to confirm your email.", userData.Name)
			}
		}

		SendEmail(emailReq)
	}

	fmt.Println("Sending JSON")
	c.JSON(http.StatusOK, gin.H{"message": "Successfull Auth", "user": newUser})
}

func GoogleCallbackHandler(c *gin.Context) {
	var userData db.User

	c.BindJSON(&userData)

	newUser := updateUserData(userData)

	fmt.Println("Sending JSON")
	c.JSON(http.StatusOK, gin.H{"message": "Successfull Auth", "user": newUser})
}

func SendEmail(emailReq SendEmailRequest) {
	marshaledData, err := json.Marshal(emailReq)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message":"Unable to Marshall json data"})
	}

	res,err := http.Post("http://scraper:3001/send_email", "application/json", bytes.NewBuffer(marshaledData))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message":"Unable to send post request to http://scraper:3001/send_email"})
	}

	defer res.Body.Close()
	body, err := io.ReadAll(res.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Unable to read response body."})
		return
	}

	var responseBody interface{}
	if err := json.Unmarshal(body, &responseBody); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Unable to unmarshal response JSON."})
		return
	}

	if res.StatusCode == 200 {
		c.JSON(http.StatusOK, responseBody)
	}

}