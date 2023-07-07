package db

import "gorm.io/gorm"

type ProductResult struct {
	gorm.Model
	Name string `json:"name"`
	URL string `json:"url"`
	Price float64 `json:"price"`
	Image string `json:"img"`
	SearchText string `json:"search_text"`
	Source string `json:"source"`
} 

type TrackedProducts struct {
	gorm.Model
	Name string `json:"name"`
	Tracked bool `json:"tracked"`
}

