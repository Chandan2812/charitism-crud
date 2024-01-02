# Node.js Express TODO API

This is a simple Node.js application with Express that provides a CRUD API for managing TODOs. The application uses MongoDB as a database and includes JWT-based authentication for user signup and login.

## Getting Started

- **Prerequisites:**
  - Ensure Node.js and MongoDB are installed and running.
  - Create a `.env` file with required configurations.

- **Installation:**
  - Clone the repository, install dependencies, and start the server.
  - **Command:**
    ```bash
    git clone https://github.com/yourusername/express-mongo-todo-api.git
    cd express-mongo-todo-api
    npm install
    npm start
    ```

## Features

### 1. User Authentication

- **Signup:**
  - Create a new user account by providing a unique username and password.
  - **Endpoint:** `/user/signup`
  - **Method:** `POST`

- **Login:**
  - Authenticate and obtain a JWT token for accessing protected routes.
  - **Endpoint:** `/user/login`
  - **Method:** `POST`

### 2. TODO Management

- **Create TODO:**
  - Add a new task to your list.
  - **Endpoint:** `/todo`
  - **Method:** `POST`
  - **Authorization:** Token

- **Get All TODOs:**
  - Retrieve a list of all tasks.
  - **Endpoint:** `/todo`
  - **Method:** `GET`

- **Update TODO:**
  - Modify an existing task's details.
  - **Endpoint:** `/todo/:id`
  - **Method:** `PUT`
  - **Authorization:** Token

- **Delete TODO:**
  - Remove a task from your list.
  - **Endpoint:** `/todo/:id`
  - **Method:** `DELETE`
  - **Authorization:** Token
