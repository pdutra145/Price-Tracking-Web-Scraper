package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ScraperArgs struct {
	UserID int `json:"user_id"`
	Url      string `json:"url"`
	Search   string `json:"search_text"`
	Endpoint string `json:"endpoint"`
}

func StartScraper(c *gin.Context) {
	var info ScraperArgs

	if err := c.BindJSON(&info); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to bind input JSON"})
		return
	}

	body, err := json.Marshal(info)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error reading the request body", "message": err.Error()})
		return
	}

	fmt.Println(body)

	url := "http://scraper:3001/start" // Replace with the desired URL
	resp, err := http.Post(url, "application/json", bytes.NewBuffer(body))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create outgoing request", "message": err.Error()})
		return
	}
	defer resp.Body.Close()

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error reading response from the scraper", "message": err.Error()})
		return
	}

	if (resp.StatusCode != 200) {
		c.JSON(resp.StatusCode, string(respBody))
		return
	}

	// Sending the response from the scraper back to the caller of your API
	c.JSON(resp.StatusCode, gin.H{"response": string(respBody)})
}
