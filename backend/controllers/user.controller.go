package controllers

import (
	"fmt"
	"net/http"

	"pricetracker/db"

	"github.com/gin-gonic/gin"
)



func handleError(err error, status int, c *gin.Context) {
	if err != nil {
		c.AbortWithError(status, err)
		return
	}
}


func GetUsers(c *gin.Context) {
	users := []db.User{}

	result := database.Find(&users)

	handleError(result.Error, http.StatusInternalServerError, c)

	c.JSON(http.StatusOK, gin.H{"users":users})
}

func GetUser(c *gin.Context) {
	var user db.User

	id := c.Param("id")

	database.Find(&user, id)

	c.JSON(http.StatusOK, gin.H{"message":"User found","user":user})
}

func DeleteUser(c *gin.Context) {
	var id string = c.Param("id")

	var user db.User

	result := database.Delete(&user, id)

	handleError(result.Error, http.StatusInternalServerError, c)

	c.JSON(http.StatusOK, gin.H{"message":fmt.Sprintf("user deleted id: %s", id)})
}

func CreateUser(c *gin.Context) {
	user := db.User{}
	err := c.BindJSON(&user)

	handleError(err, http.StatusInternalServerError, c)

	result := database.Create(&user)

	handleError(result.Error, http.StatusInternalServerError, c)

	c.JSON(http.StatusOK, gin.H{"message":fmt.Sprintf("Created user %s", user.ID)})
}