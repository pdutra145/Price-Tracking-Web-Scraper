# Set base image as golang version 1.20
FROM golang:1.20

# Set working dir inside container
WORKDIR /app

ENV UID=1000
ENV GID=1000

# Copy the Go mod files to the working directory
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of the project files to the working directory
COPY . .

# Build the Go project
# RUN go build -o myapp

# Expose the port that your Go application listens on
EXPOSE 8393

# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh

# Set the command to run your Go application
ENTRYPOINT [ "/entrypoint.sh" ]