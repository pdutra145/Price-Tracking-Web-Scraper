package db

import "gorm.io/gorm"

type ProductResult struct {
	gorm.Model
	UserID     int
	User       User    `gorm:"foreignKey:UserID"`
	Name       string  `json:"name"`
	URL        string  `json:"url"`
	Price      float64 `json:"price"`
	Image      string  `json:"img"`
	SearchText string  `json:"search_text"`
	Source     string  `json:"source"`
}

type TrackedProduct struct {
	gorm.Model
	UserID  int
	User    User   `gorm:"foreignKey:UserID"`
	Name    string `json:"name"`
	Tracked bool   `json:"tracked" gorm:"default:true"`
}

type User struct {
	gorm.Model
	Name  string `json:"name"`
	Email string `json:"email"`
}
