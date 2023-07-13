package controllers

import (
	"errors"
	"fmt"
	"net/http"
	"pricetracker/db"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func AddTrackedProduct(c *gin.Context) {
	var requestData db.TrackedProduct

	if err := c.ShouldBindJSON(&requestData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error in binding json request data": err.Error()})
		return
	}

	database.Create(&requestData)

	c.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("Product \"%s\" was sucessfully added to tracking", requestData.Name)})
}

func UpdateTrackedProduct(c *gin.Context) {
	id := c.Param("id")

	var product db.TrackedProduct

	c.BindJSON(&product)

	result := database.Where("id = ?", id).Updates(db.TrackedProduct{
		Name:    product.Name,
		Tracked: product.Tracked,
	})

	if result.Error != nil {
		// Handle the error
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update Product"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("Updated product \"%s\"", id), "product": product})
}

func GetTrackedProducts(c *gin.Context) {
	var results []db.TrackedProduct

	database.Find(&results)

	c.JSON(http.StatusOK, gin.H{"message": "Found Tracked Products results", "results": results})
}

func GetTrackedProduct(c *gin.Context) {
	id := c.Param("id")

	var product db.TrackedProduct

	result := database.Where("id = ?", id).First(&product)
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
