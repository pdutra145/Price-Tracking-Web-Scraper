# Project Information

This project provides a user interface to interact with an automated price tracking web scraper. Currently the tracker scrapes amazon.ca, but could be configured to scrape multiple sources.

A Web App that allows you to easily scrape, analyze, and store data from top retail companies.
We live in a world that the biggest asset is data. That's why big tech companies made fortunes in the past 20 years.
This project allows you to scrape prices of products or services that you are interested so you can
be ahead of your competition (or keep track for a fall in a price product you like). Instead of manually checking for the products
availability and prices, forget about that, the bot will scrape that info for you in seconds.

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

#### `/scraper/start`

**Description**: start the scraper

**Body**:

- `endpoint`
- `url`
- `search_text`
- `user_id`

#### `/products/results`

**Description**: POST or Get Product Results

#### `/products/tracked/:id`

**Description**: Get Tracked Product

#### `/products/tracked/`

**Description**: Get All Tracked Products

#### `/users`

**Description**: Get All Users

#### `/users/:id`

**Description**: Get, Delete, or Update User

#### `/users/create`

**Description**: Create User

## Scraper

The Scraper of the application is built using playwright as the scrapping tool. It depends on **Bright Data** proxy scraping service to get rid of blocks and captchas.

It is important to note that in order for the API and Frontend services use the scraper, a simple http server was built with flask so the services can communicate.

All the data scraping and data science logic should be done here.

## Using the Scraper

Install all dependencies, create the `auth.json` file, start the flask backend, run the react frontend and interact with the tool.

### auth.json

Fill in your [Bright Data Scraping Browser](https://brightdata.com/products/scraping-browser) credentials in a `scraper/auth.json` file (see `auth_example.json`).

## Frontend

The Frontend service is built with the React Framework. It uses Material UI components to help with the UI/UX of the service.

### Routes

- `/auth`: for user to authenticate via Google or Email
- `/dashboard`: Where the user can interact with his data and
  action the scraper service
- `/settings`: User can change default preferences and configure
  to their own needs.
