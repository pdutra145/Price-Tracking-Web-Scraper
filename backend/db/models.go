package db

import (
	"time"

	"gorm.io/gorm"
)

type BaseModel struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deleted_at,omitempty"`
}

type ProductResult struct {
	BaseModel
	UserID     int    `json:"user_id"`
	User       User   `gorm:"foreignKey:UserID" json:"user"`
	Name       string `json:"name"`
	URL        string `json:"url"`
	PriceValue float64 `json:"price_value"`
	PriceCurrency string `json:"price_currency"`
	Image      string   `json:"img"`
	SearchText string   `json:"search_text"`
	Source     string   `json:"source"`
	Tracked bool   `json:"tracked" gorm:"default:false"`
}


type TrackedProduct struct {
	BaseModel
	UserID  int    `json:"user_id"`
	User    User   `gorm:"foreignKey:UserID"`
	Name    string `json:"name"`
	Tracked bool   `json:"tracked" gorm:"default:true"`
}

type User struct {
	BaseModel
	Username string `json:"username"`
	Name    string `json:"name"`
	Email   string `json:"email"`
	Password string `json:"password"`
	Picture string `json:"picture"`
	AuthProvider string `json:"auth_provider"`
	AccessToken string `json:"access_token"`
	EmailToken string `json:"email_token"`
	EmailConfirmed bool `json:"email_confirmed" gorm:"default:false"`
}
