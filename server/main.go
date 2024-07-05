package main

import (
	"log"
	"net/http"

	_ "github.com/joho/godotenv/autoload"
	"github.com/rusher2004/Eve-MyGuys/server/server"
)

func main() {
	s, err := server.NewServer()
	if err != nil {
		log.Fatalf("error getting new server: %v", err)
	}

	log.Println("Starting server on :8080")
	http.ListenAndServe(":8080", s.Router())
}
