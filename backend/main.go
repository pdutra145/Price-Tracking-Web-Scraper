package main

import (
	"fmt"
	// "os"
	"pricetracker/controllers"
	auth "pricetracker/controllers/auth"
	"pricetracker/middleware"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func init() {
	godotenv.Load(".env")
}

func main() {
	// mode, _ := os.LookupEnv("MODE")

	// if mode == "debug" {
	// 	gin.SetMode(gin.ReleaseMode)
	// }

	app := gin.Default()

	app.LoadHTMLGlob("templates/*")

	app.Use(middleware.CORSMiddleware())

	app.POST("/scraper/start", controllers.StartScraper)

	app.POST("/products/results", controllers.SubmitProductResults)
	app.GET("/products/results", controllers.GetProductResults)

	// app.POST("/products/tracked/add", controllers.AddTrackedProduct)
	app.GET("/products/tracked/:id", controllers.GetTrackedProduct)
	app.GET("/products/tracked/", controllers.GetTrackedProducts)
	// app.PATCH("/products/tracked/:id", controllers.UpdateTrackedProduct)

	app.GET("/users", controllers.GetUsers)
	app.GET("/users/:id", controllers.GetUser)
	app.DELETE("/users/:id", controllers.DeleteUser)
	app.POST("/users/create", controllers.CreateUser)

	app.POST("/auth/google/callback", auth.GoogleCallbackHandler)
	app.POST("/auth/signup", auth.CreateUserHandler)
	app.POST("/auth/login", auth.LoginHandler)

	app.GET("/users/auth/email/:token", auth.EmailConfirmation)

	// port, exists := os.LookupEnv("PORT")
	app.Run(fmt.Sprintf(":%s", "8393"))

}
