# Project Overview

After cloning the project, run `npm i` (both frontend and backend). The project will run locally.

## Progress

- **Completion Status**: 75%
- **Missing Features**: Protect route (do not add properly), proper toast message
- **State Management**: Using Context API
- **Exploring**: Redux and Redux Toolkit
- **Email Handling**: Using Node Mailer for sending emails (e.g., forgot password)
- **Password Handling**: Passwords are hashed before saving to the database
- **Authentication**: Token is set in localStorage after login
- **Routing**: After login, user is automatically redirected to the profile route
- **Profile Management**: Users can read and update their profile
- **Task Management**: Authenticated users can add, edit, delete, and view tasks

## Technologies Used

- Next.js
- Tailwind CSS
- Node Mailer
- Context API
- Express.js
- MongoDB
- Mongoose

## Design

- Simple design inspired by Dribbble and Pinterest

# API Documentation

This document provides detailed explanations of the API endpoints available in the application. Each endpoint is described with its purpose, request format, parameters, and example responses.

## Base URL

`http://localhost:5000/`

## Authentication

### Register User

- **Endpoint**: `/register`
- **Method**: `POST`
- **Parameters**:
  - `username` (required, string): The name of the user
  - `email` (required, string): The email of the user
  - `password` (required, string): The password of the user
  - `designation` (optional, string): The designation of the user

### Login User

- **Endpoint**: `/login`
- **Method**: `POST`
- **Parameters**:
  - `email` (required, string): The email of the user
  - `password` (required, string): The password of the user

### Forgot Password

- **Endpoint**: `/forgot-password`
- **Method**: `POST`

### Reset Password

- **Endpoint**: `/reset-password`
- **Method**: `POST`

### Get Profile

- **Endpoint**: `/profile/:email`
- **Method**: `GET`

### Update Profile

- **Endpoint**: `/profile`
- **Method**: `PUT`
- **Parameters**:
  - `id` (required, integer): The ID of the user
  - `name` (optional, string): The updated name of the user
  - `email` (optional, string): The updated email of the user

## Task Management

### Authenticated User's Tasks

- **Endpoint**: `/tasks/:email`
- **Method**: `GET`

### Single Task

- **Endpoint**: `/tasks/:id`
- **Method**: `GET`

### Add Task

- **Endpoint**: `/tasks`
- **Method**: `POST`

### Update Task

- **Endpoint**: `/tasks/:id`
- **Method**: `PUT`

### Delete Task

- **Endpoint**: `/tasks/:id`
- **Method**: `DELETE`
- **Parameters**:
  - `id` (required, integer): The ID of the user

## Security Features

- **Password Hashing**: Passwords are hashed using `bcryptjs` for secure storage
- **Token Validation**: JWTs are used for authentication and validated on each request
- **Secure Token Storage**: Tokens are stored in secure local storage
- **Token Expiry**: JWTs have an expiration time to limit their validity (7 days)
