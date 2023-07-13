package controllers

import (
	"pricetracker/db"

	"context"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var (
	googleOAuthConfig *oauth2.Config
	googleApiUrl      string = "https://www.googleapis.com/oauth2/v3/userinfo"
)

func init() {
	godotenv.Load(".env")

	googleOAuthConfig = &oauth2.Config{
		RedirectURL:  os.Getenv("GOOGLE_CALLBACK_URL"),
		ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
		Scopes: []string{"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile"},
		Endpoint: google.Endpoint,
	}
}

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

func extractToken(code string, c *gin.Context) *oauth2.Token {
	token, err := googleOAuthConfig.Exchange(c, code)

	if err != nil {
		log.Printf("Error with request: %s", err.Error())
		c.Redirect(http.StatusBadRequest, "/")
	}

	return token
}

func updateUserData(userData db.User) db.User {
	var newUser db.User

	database := db.ConnectDB()

	database.Where("email = ?", userData.Email).First(&newUser)

	newUser.Name = userData.Name
	newUser.Email = userData.Email

	database.Save(&newUser)

	return newUser
}

func GoogleCallbackHandler(c *gin.Context) {
	code := c.Query("code")

	var tokenData string

	token := extractToken(code, c)

	client := googleOAuthConfig.Client(context.Background(), token)

	res, err := client.Get(googleApiUrl)

	if err != nil {
		log.Printf("Error with request: %s", err.Error())
		c.Redirect(http.StatusBadRequest, "/")
	}

	userData := getUserData(res, c)

	newUser := updateUserData(userData)

	googleToken, err := c.Cookie("google_token")
	if err != nil {
		c.SetCookie("google_token", token.AccessToken, 3600, "/", "localhost", true, true)
		tokenData = token.AccessToken
	} else {
		tokenData = googleToken
	}

	c.JSON(http.StatusOK, gin.H{"message": "Successfull Auth", "user": newUser, "token": tokenData})
}

func GoogleLoginHandler(c *gin.Context) {
	url := googleOAuthConfig.AuthCodeURL(os.Getenv("GOOGLE_AUTH_STATE"), oauth2.AccessTypeOnline)
	c.JSON(http.StatusOK, gin.H{"url": url})
}
