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
	Tracked(router)

	return router
}

func Results(router *gin.RouterGroup) {
	results := router.Group("/results")

	results.POST("/", controllers.SubmitProductResults)
	results.GET("/", controllers.GetProductResults)

}

func Tracked(router *gin.RouterGroup) {
	results := router.Group("/tracked")

	results.POST("add", controllers.AddTrackedProduct)
	results.GET(":id", controllers.GetTrackedProduct)
	results.GET("", controllers.GetTrackedProduct)
	results.PATCH(":id", controllers.UpdateTrackedProduct)
}

func Users(app *gin.Engine) *gin.RouterGroup {
	router := app.Group("/users")

	router.GET("", controllers.GetUsers)
	router.GET(":id", controllers.GetUser)
	router.DELETE(":id", controllers.DeleteUser)
	router.POST("create", controllers.CreateUser)

	return router
}

func Auth(app *gin.Engine) *gin.RouterGroup {
	router := app.Group("/auth")

	router.POST("/callback", controllers.GoogleCallbackHandler)

	return router
}
