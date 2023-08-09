package controllers

import (
	"pricetracker/db"
)



type EmailerInfo struct {
	Name string `json:"name"`
	Email string `json:"email"`
}

type ContentInfo struct {
	Title string `json:"title"`
	Message string `json:"message"`
}

type SendEmailRequest struct {
	Sender EmailerInfo `json:"sender"`
	To EmailerInfo `json:"to"`
	Subject string `json:"subject"`
	Content ContentInfo `json:"content"`
}

type AuthHandlerBody struct {
	db.User
	Password string `json:"password"`
}

type LoginBody struct {
	Email string `json:"email"`
	Password string `json:"password"`
}