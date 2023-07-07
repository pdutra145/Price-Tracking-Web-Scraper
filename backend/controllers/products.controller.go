package controllers

import (
	"fmt"
	"net/http"
	"pricetracker/db"

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
		Data       []map[string]any `json:"data"`
		SearchText string           `json:"search_text"`
		Source     string           `json:"source"`
	}

	if err := c.ShouldBindJSON(&requestData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error in binding json request data": err.Error()})
		return
	}

	fmt.Println(requestData)

	for _, result := range requestData.Data {
		productResult := db.ProductResult{
			Name:       result["name"].(string),
			URL:        result["url"].(string),
			Image:      result["img"].(string),
			Price:      (result["price"]).(float64),
			SearchText: requestData.SearchText,
			Source:     requestData.Source,
		}
		database.Create(&productResult)
	}

	response := gin.H{"message": "Received data successfully"}
	c.JSON(http.StatusOK, response)
}
