package main

import (
	"fmt"
	"os"
	"pricetracker/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func init() {
	godotenv.Load(".env")
}

func main() {
	mode, _ := os.LookupEnv("MODE")

	if mode == "debug" {
		gin.SetMode(gin.DebugMode)
	}

	app := gin.Default()

	routes.Scraper(app)
	routes.Products(app)
	routes.Users(app)
	routes.Auth(app)

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3003"}
	config.AllowMethods = []string{"GET", "POST"}
	app.Use(cors.New(config))

	port, exists := os.LookupEnv("PORT")

	if exists {
		app.Run(fmt.Sprintf(":%s", port))
	} else {
		panic("No port")
	}
}
