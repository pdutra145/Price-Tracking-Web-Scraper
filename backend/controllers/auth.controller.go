package controllers

import (
	"fmt"
	"pricetracker/db"

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

func getUserData(res *http.Response, c *gin.Context) db.User {
	defer res.Body.Close()

	contents, err := io.ReadAll(res.Body)

	if err != nil {
		log.Printf("Unable to read body: %s", err.Error())
		c.Redirect(http.StatusBadRequest, "/")
	}

	var userData db.User

	err = json.Unmarshal(contents, &userData)

	if err != nil {
		log.Printf("Unable to read body: %s", err.Error())
		c.Redirect(http.StatusBadRequest, "/")
	}

	return userData
}

func updateUserData(userData db.User) db.User {
	var newUser db.User

	database := db.ConnectDB()

	database.Where("email = ?", userData.Email).First(&newUser)

	newUser.Name = userData.Name
	newUser.Email = userData.Email
	newUser.Picture = userData.Picture
	newUser.AccessToken = userData.AccessToken

	database.Save(&newUser)

	return newUser
}

func GoogleCallbackHandler(c *gin.Context) {
	var userData db.User

	c.BindJSON(&userData)

	newUser := updateUserData(userData)

	fmt.Println("Sending JSON")
	c.JSON(http.StatusOK, gin.H{"message": "Successfull Auth", "user": newUser})
}
