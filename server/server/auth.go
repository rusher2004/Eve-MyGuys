package server

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"
)

type oauthToken struct {
	AccessToken  string `json:"access_token"`
	ExpiresIn    int    `json:"expires_in"`
	RefreshToken string `json:"refresh_token"`
	TokenType    string `json:"token_type"`
}

func handleGetAuthCallback(w http.ResponseWriter, r *http.Request) {
	type response struct {
		AccessToken string `json:"accessToken"`
	}

	code, ok := r.URL.Query()["code"]
	if !ok || len(code) < 1 {
		log.Println("URL Param 'code' is missing")
		return
	}

	token, err := getOAuthToken(code[0])
	if err != nil {
		log.Printf("error getting oauth token: %v", err)
		return
	}
	log.Printf("got token: %+v", token)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response{AccessToken: token.AccessToken})
}

func getOAuthToken(code string) (oauthToken, error) {
	// move this to startup
	id, ok := os.LookupEnv("ESI_CLIENT_ID")
	if !ok {
		return oauthToken{}, errors.New("ESI_CLIENT_ID not set")
	}
	secret, ok := os.LookupEnv("ESI_CLIENT_SECRET")
	if !ok {
		return oauthToken{}, errors.New("ESI_CLIENT_SECRET not set")
	}

	cl := http.Client{Timeout: 5 * time.Second}

	v := url.Values{}
	v.Set("grant_type", "authorization_code")
	v.Set("code", code)

	vString := v.Encode()

	req, err := http.NewRequest("POST", "https://login.eveonline.com/v2/oauth/token", strings.NewReader(vString))
	if err != nil {
		return oauthToken{}, fmt.Errorf("error creating oauth token request: %w", err)
	}
	req.SetBasicAuth(id, secret)

	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("Host", "login.eveonline.com")

	resp, err := cl.Do(req)
	if err != nil {
		return oauthToken{}, fmt.Errorf("error getting oauth token: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return oauthToken{}, fmt.Errorf("error getting oauth token: %s", resp.Status)
	}

	b, err := io.ReadAll(resp.Body)
	if err != nil {
		return oauthToken{}, fmt.Errorf("error reading oauth token response: %w", err)
	}

	log.Printf("b: %+v\n", b)

	var token oauthToken
	if err := json.Unmarshal(b, &token); err != nil {
		return oauthToken{}, fmt.Errorf("error unmarshalling oauth token: %w", err)
	}

	return token, nil
}
