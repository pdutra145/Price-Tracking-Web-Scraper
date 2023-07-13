package db

import (
	"fmt"
	"log"
	"os"

	"encoding/json"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DBEnv struct {
	PORT     int
	HOST     string
	USER     string
	PASSWORD string
	DBNAME   string
}

var db_data DBEnv

func init() {
	content, err := os.ReadFile("./db/db.json")

	if err != nil {
		log.Fatalln("Error in reading db.json", err)
	}

	err = json.Unmarshal(content, &db_data)

	if err != nil {
		log.Fatalln("Error in unmarshalling json content", err)
	}
}

func ConnectDB() *gorm.DB {
	conn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%v",
		db_data.HOST, db_data.USER, db_data.PASSWORD, db_data.DBNAME, db_data.PORT)

	db, err := gorm.Open(postgres.Open(conn), &gorm.Config{})
	if err != nil {
		log.Fatalln("Failed to connect to database", err)
	}

	db.AutoMigrate(&User{}, &ProductResult{}, &TrackedProduct{})

	return db

}
