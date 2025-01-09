# `Ear Trainer Pro`

## Database Schema Design

![db schema](ear-triner/images/db-schema.png)

---

## API Documentation

### USER AUTHENTICATION/AUTHORIZATION

#### All endpoints that require authentication

All endpoints that require a current user to be logged in.

- **Error Response: Require authentication**
  - **Status Code:** 401
  - **Headers:**
    - `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "message": "Authentication required"
    }
    ```

#### All endpoints that require proper authorization

Endpoints requiring authentication and the current user does not have the correct role(s) or permission(s).

- **Error Response: Require proper authorization**
  - **Status Code:** 403
  - **Headers:**
    - `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "message": "Forbidden"
    }
    ```

---

### USER ROUTES

#### Sign Up a User

Creates a new user, logs them in, and returns the current user's information.

- **Require Authentication:** false
- **Request**

  - **Method:** POST
  - **Route path:** `/userSession`
  - **Headers:**
    - `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "password": "secret password"
    }
    ```

- **Successful Response**
  - **Status Code:** 201
  - **Headers:**
    - `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

---

### EXERCISE ROUTES

#### Get All Exercises

Fetch a list of all available ear training exercises.

- **Require Authentication:** false
- **Request**
  - **Method:** GET
  - **Route path:** `/exercises`
  - **Body:** none

#### Get Exercise by ID

Fetch details for a specific exercise.

- **Require Authentication:** false
- **Request**
  - **Method:** GET
  - **Route path:** `/exercises/:exerciseId`
  - **Body:** none

#### Get Questions for an Exercise

Fetch all questions associated with a specific exercise.

- **Require Authentication:** false
- **Request**
  - **Method:** GET
  - **Route path:** `/exercises/:exerciseId/questions`
  - **Body:** none

#### Start an Exercise

Initiates a specific exercise and returns the session details.

- **Require Authentication:** true
- **Request**
  - **Method:** POST
  - **Route path:** `/exercises/:exerciseId/start`
  - **Headers:**
    - `Content-Type: application/json`
  - **Body:** none

#### Get Progress for an Exercise

Retrieve progress for a specific exercise for the current user.

- **Require Authentication:** true
- **Request**
  - **Method:** GET
  - **Route path:** `/exercises/:exerciseId/progress`
  - **Body:** none

---

### SESSION ROUTES

#### Get All User Sessions

Retrieve all sessions for the current user.

- **Require Authentication:** true
- **Request**
  - **Method:** GET
  - **Route path:** `/sessions`
  - **Body:** none

#### Get Session by ID

Retrieve a specific session by ID for the current user.

- **Require Authentication:** true
- **Request**
  - **Method:** GET
  - **Route path:** `/sessions/:sessionId`
  - **Body:** none

#### Submit an Answer

Submit an answer for a specific question in a session.

- **Require Authentication:** true
- **Request**
  - **Method:** POST
  - **Route path:** `/sessions/:sessionId/answers`
  - **Headers:**
    - `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "questionId": 1,
      "selectedAnswer": "Perfect Fifth"
    }
    ```

---

### USER STATS

#### Get User Stats

Fetch performance statistics for the current user.

- **Require Authentication:** true
- **Request**
  - **Method:** GET
  - **Route path:** `/users/:userId/stats`
  - **Body:** none

---

### ROADMAP

1. Add more advanced exercises (e.g., rhythm dictation, melody transcription).
2. Implement leaderboards and competitive challenges.
3. Integrate MIDI support for interactive training.
4. Launch a dedicated mobile app.

---

## Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Audio:** Tone.js, Web Audio API
- **Hosting:** Render
