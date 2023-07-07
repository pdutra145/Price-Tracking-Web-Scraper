package controllers

import (
	"bytes"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ScraperArgs struct {
	Url    string `json:"url"`
	Search string `json:"search_text"`
}

func StartScraper(c *gin.Context) {
	var info ScraperArgs

	c.BindJSON(&info)

	body, err := io.ReadAll(c.Request.Body)
	if err != nil {
		fmt.Println("Error reading the request body:", err)
		return
	}

	resp, err := http.Post("http://scraper:3001/start", "application/json", bytes.NewBuffer(body))

	if err != nil {
		log.Fatalln("Unable to send request to scraper", err)
	}

	defer resp.Body.Close()

	body, err = io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading response body:", err)
		return
	}

	c.Data(resp.StatusCode, resp.Header.Get("Content-Type"), body)
}
