package controllers

import (
	"pricetracker/db"
)

type EmailCreds struct {
	HOST string
	PORT int
	USERNAME string
	PASSWORD	 string
}

type EmailerInfo struct {
	Name string `json:"name"`
	Email string `json:"email"`
}

type ContentInfo struct {
	Title string `json:"title"`
	Message string `json:"message"`
}

type ConfirmationInfo struct {
	ConfirmationURL string `json:"confirmation_url"`
	EmailToken string `json:"confirmation_token"`

}

type SendEmailRequest struct {
	Date string `json:"date"`
	Sender EmailerInfo `json:"sender"`
	To EmailerInfo `json:"to"`
	Subject string `json:"subject"`
	Content ContentInfo `json:"content"`
	ConfirmationURL string `json:"confirmation_url"`
}

type AuthHandlerBody struct {
	db.User
	Password string `json:"password"`
}

type LoginBody struct {
	Email string `json:"email"`
	Password string `json:"password"`
}