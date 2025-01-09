# Ear Trainer Pro

## Overview

Ear Trainer Pro is a comprehensive ear training application designed to help users improve their musical hearing skills. The platform offers customizable exercises for interval recognition, chord identification, and other music theory concepts. Teachers can assign exercises to students, track their progress, and provide feedback.

---

## Database Schema Design

The database schema includes the following tables:

![Database Schema](ear-triner/images/db-schema.png)

### Tables

- **Users**: Stores user information, including roles (teacher or student).
- **Exercises**: Stores exercise details, such as name, description, and difficulty level.
- **Sessions**: Tracks user progress for each exercise.
- **Questions**: Stores exercise questions with options and correct answers.
- **Answers**: Stores user-submitted answers for each session.
- **Assignments**: Tracks which exercises a teacher has assigned to students.

---

## API Documentation

### User Authentication/Authorization

#### 1. Restore Session User

Fetches the information about the currently logged-in user.

- **Method:** `GET`
- **Route:** `/session`

#### 2. Log In

Authenticates a user using their email or username.

- **Method:** `POST`
- **Route:** `/session`

#### 3. Log Out

Logs out the currently logged-in user.

- **Method:** `DELETE`
- **Route:** `/session`

#### 4. Sign Up

Creates a new user.

- **Method:** `POST`
- **Route:** `/users`

---

### User Routes

#### 1. Get User Stats

Fetches statistics for a user, including total sessions, accuracy, and most practiced exercises.

- **Method:** `GET`
- **Route:** `/users/:userId/stats`

#### 2. Edit User

Allows a user to edit their account information.

- **Method:** `PUT`
- **Route:** `/users/:userId`

---

### Exercises Routes

#### 1. Get All Exercises

Fetches all available exercises.

- **Method:** `GET`
- **Route:** `/exercises`

#### 2. Get Exercise by ID

Fetches details of a specific exercise.

- **Method:** `GET`
- **Route:** `/exercises/:exerciseId`

#### 3. Create an Exercise

Allows teachers to create new exercises.

- **Method:** `POST`
- **Route:** `/exercises`

#### 4. Edit an Exercise

Allows teachers to update an existing exercise.

- **Method:** `PUT`
- **Route:** `/exercises/:exerciseId`

#### 5. Delete an Exercise

Allows teachers to delete an existing exercise.

- **Method:** `DELETE`
- **Route:** `/exercises/:exerciseId`

#### 6. Start an Exercise

Initiates a session for a specific exercise.

- **Method:** `POST`
- **Route:** `/exercises/:exerciseId/start`

#### 7. Get Exercise Progress

Fetches progress for a specific exercise.

- **Method:** `GET`
- **Route:** `/exercises/:exerciseId/progress`

---

### Questions Routes

#### 1. Add Questions to an Exercise

Allows teachers to add questions to an exercise.

- **Method:** `POST`
- **Route:** `/exercises/:exerciseId/questions`

#### 2. Get Questions for an Exercise

Fetches all questions for a specific exercise.

- **Method:** `GET`
- **Route:** `/exercises/:exerciseId/questions`

#### 3. Edit a Question

Allows teachers to edit a specific question.

- **Method:** `PUT`
- **Route:** `/exercises/:exerciseId/questions/:questionId`

#### 4. Delete a Question

Allows teachers to delete a specific question.

- **Method:** `DELETE`
- **Route:** `/exercises/:exerciseId/questions/:questionId`

---

### Assignments Routes

#### 1. Get Assignments

Fetches all assignments for a teacher or student.

- **Method:** `GET`
- **Route:** `/assignments`

#### 2. Get Assignment by ID

Fetches details of a specific assignment.

- **Method:** `GET`
- **Route:** `/assignments/:assignmentId`

#### 3. Assign Exercise to a Student

Allows teachers to assign an exercise to a student.

- **Method:** `POST`
- **Route:** `/exercises/:exerciseId/assign`

#### 4. Delete an Assignment

Allows teachers to delete a specific assignment.

- **Method:** `DELETE`
- **Route:** `/assignments/:assignmentId`

---

### Sessions Routes

#### 1. Get All Sessions

Fetches all sessions for the logged-in user.

- **Method:** `GET`
- **Route:** `/sessions`

#### 2. Get Session by ID

Fetches details of a specific session.

- **Method:** `GET`
- **Route:** `/sessions/:sessionId`

#### 3. Submit an Answer

Submits an answer for a specific session.

- **Method:** `POST`
- **Route:** `/sessions/:sessionId/answers`

---

## Missing or Recommended APIs

1. **Leaderboard API**

   - Allows users to view rankings based on exercise scores.
   - **Method:** `GET`
   - **Route:** `/leaderboard`

2. **Feedback API**

   - Allows teachers to provide feedback on a student’s performance.
   - **Method:** `POST`
   - **Route:** `/sessions/:sessionId/feedback`

3. **Bulk Question Upload**

   - Allows teachers to upload multiple questions for an exercise at once.
   - **Method:** `POST`
   - **Route:** `/exercises/:exerciseId/questions/bulk`

4. **Update Assignment**
   - Allows teachers to update an existing assignment.
   - **Method:** `PUT`
   - **Route:** `/assignments/:assignmentId`

---

## Roadmap

1. Add more advanced exercises (e.g., rhythm transcription, melody harmonization).
2. Implement a progress tracker with visual analytics.
3. Develop a dedicated mobile app.
4. Add multiplayer challenges and competitive leaderboards.

---

## Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Audio:** Tone.js, Web Audio API
- **Hosting:** Render

---
