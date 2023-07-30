package db

import (
	"gorm.io/gorm"
	"time"
)

type BaseModel struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deleted_at,omitempty"`
}

type ProductResult struct {
	BaseModel
	UserID     int     `json:"user_id"`
	User       User    `gorm:"foreignKey:UserID" json:"user"`
	Name       string  `json:"name"`
	URL        string  `json:"url"`
	Price      float64 `json:"price"`
	Image      string  `json:"img"`
	SearchText string  `json:"search_text"`
	Source     string  `json:"source"`
}

type TrackedProduct struct {
	BaseModel
	UserID  int
	User    User   `gorm:"foreignKey:UserID"`
	Name    string `json:"name"`
	Tracked bool   `json:"tracked" gorm:"default:true"`
}

type User struct {
	BaseModel
	Name    string `json:"name"`
	Email   string `json:"email"`
	Picture string `json:"picture"`
}
