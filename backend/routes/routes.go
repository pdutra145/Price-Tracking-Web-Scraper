package routes

import (
	"pricetracker/controllers"

	"github.com/gin-gonic/gin"
)

func Scraper(app *gin.Engine) *gin.RouterGroup {
	router := app.Group("/scraper")

	router.POST("/start", controllers.StartScraper)
	return router
}

func Products(app *gin.Engine) *gin.RouterGroup {
	router := app.Group("/products")

	Results(router)

	return router
}

func Results(router *gin.RouterGroup)  {
	results := router.Group("/results")

	results.POST("/", controllers.SubmitProductResults)
	results.GET("/", controllers.GetProductResults)

}