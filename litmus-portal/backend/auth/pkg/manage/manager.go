package manage

import (
	"log"
	"time"

	"github.com/globalsign/mgo"
	"golang.org/x/crypto/bcrypt"

	"github.com/litmuschaos/litmus/litmus-portal/backend/auth/pkg/errors"
	"github.com/litmuschaos/litmus/litmus-portal/backend/auth/pkg/generates"
	"github.com/litmuschaos/litmus/litmus-portal/backend/auth/pkg/models"
	"github.com/litmuschaos/litmus/litmus-portal/backend/auth/pkg/store"
	"github.com/litmuschaos/litmus/litmus-portal/backend/auth/pkg/types"
)

// NewManager create to authorization management instance
func NewManager() *Manager {
	return &Manager{}
}

// Manager provide authorization management
type Manager struct {
	accessGenerate *generates.JWTAccessGenerate
	userStore      *store.UserStore
}

// MapAccessGenerate mapping the access token generate interface
func (m *Manager) MapAccessGenerate(gen *generates.JWTAccessGenerate) {
	m.accessGenerate = gen
}

// MustUserStorage mandatory mapping the user store interface
func (m *Manager) MustUserStorage(stor *store.UserStore, err error) {
	if err != nil {
		panic(err)
	}
	m.userStore = stor
	err = m.CreateUser(models.DefaultUser)
	if err != nil {
		log.Fatal("Unable to create default user with error:", err)
	}
}

// GetUser get the user information
func (m *Manager) GetUser(userName string) (user *models.User, err error) {
	user, err = m.userStore.GetByUserName(userName)
	if err != nil && err == mgo.ErrNotFound {
		err = errors.ErrInvalidUser
	}
	return
}

// CheckUserExists get the user information
func (m *Manager) CheckUserExists(userName string) (bool, error) {
	_, err := m.GetUser(userName)
	if err != nil && err == errors.ErrInvalidUser {
		return false, nil
	} else if err != nil {
		return false, err
	}
	return true, nil
}

// VerifyUserPassword verifies user password
func (m *Manager) VerifyUserPassword(username, password string) (*models.PublicUserInfo, error) {
	user, err := m.GetUser(username)
	if err != nil {
		return nil, err
	}
	err = bcrypt.CompareHashAndPassword([]byte(user.GetPassword()), []byte(password))
	return user.GetPublicInfo(), err
}

// CreateUser get the user information
func (m *Manager) CreateUser(user *models.User) (err error) {

	exists, err := m.CheckUserExists(user.UserName)
	if err != nil || exists {
		return
	}
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), types.PasswordEncryptionCost)
	if err != nil {
		return
	}
	user.Password = string(hashedPassword)
	err = m.userStore.Set(user)
	return
}

// GenerateAuthToken generate the authorization token(code)
func (m *Manager) GenerateAuthToken(tgr *TokenGenerateRequest) (*models.Token, error) {

	ti := models.NewToken()

	createAt := time.Now()
	td := &generates.GenerateBasic{
		UserInfo:  tgr.UserInfo,
		CreateAt:  &createAt,
		TokenInfo: ti,
	}

	cfg := DefaultTokenCfg
	aexp := cfg.AccessTokenExp
	if exp := tgr.AccessTokenExp; exp > 0 {
		aexp = exp
	}
	ti.SetAccessCreateAt(createAt)
	ti.SetAccessExpiresIn(aexp)

	tv, err := m.accessGenerate.Token(td)
	if err != nil {
		return nil, err
	}
	ti.SetAccess(tv)
	return ti, nil
}

// ValidateToken validates the token
func (m *Manager) ValidateToken(tokenString string) (valid bool, err error) {
	valid, err = m.accessGenerate.Validate(tokenString)
	return
}

// ParseToken validates the token
func (m *Manager) ParseToken(tokenString string) (userInfo *models.PublicUserInfo, err error) {
	userInfo, err = m.accessGenerate.Parse(tokenString)
	return
}

// UpdateUserDetails get the user information
func (m *Manager) UpdateUserDetails(user *models.User) (*models.PublicUserInfo, error) {

	if user.GetPassword() == "" {
		return nil, errors.ErrInvalidRequest
	}

	storedUser, err := m.GetUser(user.UserName)
	if err != nil {
		return nil, errors.ErrInvalidUser
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.GetPassword()), types.PasswordEncryptionCost)
	if err != nil {
		return nil, err
	}
	storedUser.Password = string(hashedPassword)
	storedUser.Email = user.GetEmail()
	storedUser.Name = user.GetName()

	err = m.userStore.UpdateUser(storedUser)
	return user.GetPublicInfo(), err
}