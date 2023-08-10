package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"pricetracker/db"
	"pricetracker/templates"
	"pricetracker/utils"
	"time"

	"math/rand"
	"net/http"

	"github.com/gin-gonic/gin"
	"gopkg.in/gomail.v2"
	// "github.com/joho/godotenv"
)

var (
	database = db.ConnectDB()
	creds    EmailCreds
)

func init() {
	content, err := os.ReadFile("controllers/auth/mailtrap_creds.json")

	if err != nil {
		log.Fatalln("Error in reading db.json", err)
	}

	err = json.Unmarshal(content, &creds)

	if err != nil {
		log.Fatalln("Error in unmarshalling json content", err)
	}
}

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
		log.Fatal(result.Error, http.StatusBadRequest)
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

	emailToken := utils.GenerateToken()

	emailReq := SendEmailRequest{
		Date: time.Now().Format(time.Stamp),
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
		ConfirmationURL: fmt.Sprintf("http://localhost:8393/auth/email/%s", emailToken),
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

// func SendEmail(emailReq SendEmailRequest) {
// 	entrypoint := "http://scraper:3001/send_email"

// 	marshaledData, err := json.Marshal(emailReq)
// 	if err != nil {
// 		log.Fatalf("Unable to Marshal email request data")
// 	}

// 	res, err := http.Post(entrypoint, "application/json", bytes.NewBuffer(marshaledData))
// 	if err != nil {
// 		log.Fatalf("Unable to post to: %s", entrypoint)

// 	}

// 	defer res.Body.Close()
// 	body, err := io.ReadAll(res.Body)
// 	if err != nil {
// 		log.Fatalf("Unable to read body of %s", entrypoint)

// 		return
// 	}

// 	fmt.Println(string(body))

// 	if res.StatusCode != 200 {
// 		log.Fatalf("Bad Status Code %d", res.StatusCode)

// 	}
// }

func SendEmail(email SendEmailRequest) {
	tmpl := templates.LoadHTMLFile("email.html")

	var tmplBytes bytes.Buffer
	if err := tmpl.Execute(&tmplBytes, email); err != nil {
		log.Fatal(err)
	}

	m := gomail.NewMessage()
	m.SetHeader("From", email.Sender.Email)
	m.SetHeader("To", email.To.Email)
	m.SetHeader("Subject", email.Subject)
	m.SetBody("text/html", tmplBytes.String())

	fmt.Print(creds)

	d := gomail.NewDialer(creds.HOST, creds.PORT, creds.USERNAME, creds.PASSWORD)

	if err := d.DialAndSend(m); err != nil {
		log.Fatal(err)
	}
}

func EmailConfirmation(c *gin.Context) {
	token, _ := c.Params.Get("token")

	type ConfirmationBody struct {
		Name string `json:"name"`
		Verify string `json:"verify"`
	}
	var data ConfirmationBody

	fmt.Println(token)

	c.BindJSON(&data)

	c.HTML(http.StatusAccepted, "email_confirmation.html", gin.H{
		"name": data.Name,
	})
}
