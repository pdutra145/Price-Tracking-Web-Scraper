package main

import (
	"fmt"
	// "os"
	"pricetracker/controllers"
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

	// Configuring CORS middleware to allow requests from your React app's domain and port

	// Configure CORS middleware
	// config := cors.DefaultConfig()
	// config.AllowAllOrigins = true
	// config.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}
	// config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}

	// app.Use(cors.New(config))

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

	app.POST("/auth/callback", controllers.GoogleCallbackHandler)

	// port, exists := os.LookupEnv("PORT")
	app.Run(fmt.Sprintf(":%s", "8393"))

}
