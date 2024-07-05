package server

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

type Server struct {
	router http.Handler
}

func NewServer() (*Server, error) {
	s := &Server{}

	s.routes()

	return s, nil
}

func (s *Server) routes() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)

		json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
	})

	r.Route("/auth", func(r chi.Router) {
		r.Get("/callback", handleGetAuthCallback)
	})

	s.router = r
}

func (s *Server) Router() http.Handler {
	return s.router
}
