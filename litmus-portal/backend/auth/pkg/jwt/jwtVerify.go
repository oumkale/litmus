package jwt

import (
	"fmt"
	"github.com/dgrijalva/jwt-go"
)

var (
	secret    = "litmus-portal@123"
)

//ValidateJWT validates ...
func ValidateJWT(token string) (bool) {
	
	// Parsing the token
	tkn, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secret), nil
	})
    // If parding containts error 
	if err != nil {
		return false
	}
	// Tocken is not valid then
	if !tkn.Valid {
		return false
	}
    // Claiming using User_Name 
	claims, ok := tkn.Claims.(jwt.MapClaims)
	if ok {
		claim := claims["UserName"].(string)
		fmt.Println(claim)
		return true
	}
	// Token invalid 
    return false
}
