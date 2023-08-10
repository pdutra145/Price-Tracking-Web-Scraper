package templates

import (
	"fmt"
	"html/template"
	"log"
)

func LoadHTMLFile(file string) *template.Template {
	tmpl, err := template.ParseFiles(fmt.Sprintf("templates/%s", file))
	if err != nil {
		log.Fatal(fmt.Sprintf("Unable to load html template: %s", file),err)
	}

	// Execute the template and store the result in a buffer
	// var tmplBytes bytes.Buffer
	// if err := tmpl.Execute(&tmplBytes, data); err != nil {
	// 	log.Fatal(err)
	// }

	return tmpl
}