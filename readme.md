# BFHL API

A simple Express.js REST API for processing arrays of mixed data (numbers, alphabets, special characters) and returning categorized results. Built by Divesh Saini.

## Features
- Accepts an array of data (numbers, alphabets, special characters) via POST request
- Returns categorized results: odd/even numbers, alphabets, special characters, sum, and a custom concatenated string
- CORS enabled
- Ready for deployment on Vercel

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Example Request/Response](#example-requestresponse)
- [Demo](#demo)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/diveshsaini1991/bajaj-api
   cd restapi
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Start the server locally:
```bash
npm start
```
The server will run on `http://localhost:3000` by default.

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### `POST /bfhl`
- **Description:** Main API endpoint. Accepts a JSON body with a `data` array.
- **Request Body:**
  ```json
  {
    "data": ["1", "2", "a", "b", "@", "3"]
  }
  ```
- **Response:**
  ```json
  {
    "is_success": true,
    "user_id": "divesh_saini_19112004",
    "email": "diveshsaini1991@gmail.com",
    "roll_number": "2210991527",
    "odd_numbers": ["1", "3"],
    "even_numbers": ["2"],
    "alphabets": ["A", "B"],
    "special_characters": ["@"],
    "sum": "6",
    "concat_string": "Ba"
  }
  ```
- **Error Response:**
  ```json
  {
    "is_success": false,
    "error": "Invalid input: 'data' must be an array"
  }
  ```

### `GET /bfhl`
- **Description:** Status check endpoint.
- **Response:**
  ```json
  {
    "operation_code": 1,
    "message": "BFHL API is running successfully"
  }
  ```

### `GET /`
- **Description:** Root endpoint. Lists available endpoints.
- **Response:**
  ```json
  {
    "message": "BFHL API Server is running",
    "endpoints": {
      "POST": "/bfhl - Main API endpoint",
      "GET": "/bfhl - Status check"
    }
  }
  ```

## 🧪 Demo
Test the live API using this endpoint:

👉 [https://bajaj-api-one-navy.vercel.app/bfhl](https://bajaj-api-one-navy.vercel.app/bfhl)
