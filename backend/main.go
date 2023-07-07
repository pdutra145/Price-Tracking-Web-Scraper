package main

import (
	"fmt"
	"os"
	"pricetracker/routes"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func init() {
	godotenv.Load(".env")
}


func main() {
	app := gin.Default()
	routes.Scraper(app)
	routes.Products(app)

	port,exists := os.LookupEnv("PORT")
	mode,_ := os.LookupEnv("MODE")

	if mode == "debug" {
		gin.SetMode(gin.DebugMode)
	}

	if exists {
		app.Run(fmt.Sprintf(":%s", port))
	} else {
		panic("No port")
	}
}