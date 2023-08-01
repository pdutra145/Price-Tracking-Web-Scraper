package controllers

import (
	"fmt"
	"net/http"
	"pricetracker/db"
	"errors"
	"gorm.io/gorm"

	"github.com/gin-gonic/gin"
)

var database = db.ConnectDB()

func GetProductResults(c *gin.Context) {
	var results []db.ProductResult

	search_text := c.Query("search_text")

	if search_text == "" {
		database.Find(&results)
		c.JSON(http.StatusFound, gin.H{"message": "Found Product results", "results": results})
		return
	}

	database.Where("search_text = ?", search_text).Find(&results).Order("created_at DESC")

	c.JSON(http.StatusFound, gin.H{"message": fmt.Sprintf("Found Product results for %s", search_text), "results": results})
}

func SubmitProductResults(c *gin.Context) {
	var requestData struct {
		UserID     int              `json:"user_id"`
		Data       []map[string]any `json:"data"`
		SearchText string           `json:"search_text"`
		Source     string           `json:"source"`
	}

	if err := c.ShouldBindJSON(&requestData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error in binding json request data": err.Error()})
		return
	}

	for _, result := range requestData.Data {
		productResult := db.ProductResult{
			BaseModel:  db.BaseModel{},
			UserID:     requestData.UserID,
			User:       db.User{},
			Name:       result["name"].(string),
			URL:        result["url"].(string),
			PriceValue:      (result["price_value"]).(float64),
			PriceCurrency: (result["price_currency"]).(string),
			Image:      result["img"].(string),
			SearchText: requestData.SearchText,
			Source:     requestData.Source,
		}
		database.Create(&productResult)
	}

	response := gin.H{"message": "Received data successfully"}
	c.JSON(http.StatusOK, response)
}

func GetTrackedProducts(c *gin.Context) {
	var results []db.ProductResult

	database.Where("tracked = ?", true).Find(&results)

	c.JSON(http.StatusOK, gin.H{"message": "Found Tracked Products results", "results": results})
}

func GetTrackedProduct(c *gin.Context) {
	id := c.Param("id")

	var product db.ProductResult

	result := database.Where("id = ? AND tracked = ?", id, true).First(&product)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		// Handle the case when no record is found
		// Return an appropriate response to the user
		c.JSON(http.StatusNotFound, gin.H{"message": fmt.Sprintf("Product \"%s\" not found.", id)})
		return
	} else if result.Error != nil {
		// Handle other errors that may occur during the query
		c.JSON(http.StatusInternalServerError, gin.H{"message": "There was an error in the server"})
		return
	}

	c.JSON(http.StatusFound, gin.H{"message": "Found Tracked Product", "product": product})
}