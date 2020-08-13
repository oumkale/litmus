FROM litmuschaos/litmusportal-subscriber:ci
RUN apt -y update
CMD SERVICE_ADDRESS=localhost:8080 DB_SERVER=localhost:27017 JWT_SECRET=1234567 go run server.go
