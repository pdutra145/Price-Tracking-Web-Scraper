package middleware

import "github.com/gin-gonic/gin"

func AllowOrigins() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Next()
	}
}
