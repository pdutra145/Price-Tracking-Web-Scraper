package controllers

import (
	"bytes"
	"fmt"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ScraperArgs struct {
	Url      string `json:"url"`
	Search   string `json:"search_text"`
	Endpoint string `json:"endpoint"`
}

func StartScraper(c *gin.Context) {
	var info ScraperArgs

	c.BindJSON(&info)

	body, err := io.ReadAll(c.Request.Body)
	if err != nil {
		fmt.Println("Error reading the request body:", err)
		return
	}

	defer c.Request.Body.Close()

	fmt.Println(info)

	url := "http://scraper:3001/start" // Replace with the desired URL
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(body))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create outgoing request", "message": err})
		return
	}

	defer req.Body.Close()

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request"})
		return
	}
	defer resp.Body.Close()

	body, err = io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading response body:", err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"response": string(body)})
}
