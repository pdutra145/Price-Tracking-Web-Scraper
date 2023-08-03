# Perseus

### What is Perseus ?

- Perseus is a Web App that allows you to easily scrape, analyze, and store data from top retail companies.
  We live in a world that the biggest asset is data. That's why big tech companies made fortunes in the past 20 years.
  Therefore by using Perseus, you are able to collect **your own data** in products that you are interested so you can
  be ahead of your competition (or keep track for a fall in a price product you like). Instead of manually checking for the products
  availability and prices, forget about that, our bot will scrape that info for you in seconds.

# Developer Guide

The web app is built using the technology that Docker and Docker-Compose offers. It is basically into three services:

- API (Golang Gin)
- Frontend (React)
- Scraper (Python)

## API

The API is built with Golang framework **Gin** and uses **GORM** as a ORM for PostgresSQL

### Packages

- **Controllers**: Handlers for the routes
- **Middleware**: Built custom middleware
- **DB**: Handles the models and connection to database

### Endpoints

## Scraper

The Scraper of the application is built using playwright as the scrapping tool. It depends on **Bright Data** proxy scraping service to get rid of blocks and captchas.

It is important to note that in order for the API and Frontend services use the scraper, a simple http server was built with flask so the services can communicate.

All the data scraping and data science logic should be done here.

## Frontend

The Frontend service is built with the React Framework. It uses Material UI components to help with the UI/UX of the service.

### Routes

- `/auth`: for user to authenticate via Google or Email
- `/dashboard`: Where the user can interact with his data and
  action the scraper service
- `/settings`: User can change default preferences and configure
  to their own needs.
