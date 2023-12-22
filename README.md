## READ-RAVE Endpoint Documentation

> API documentation for READ Dev Apps

## Authentication section [ Users ]

> ### Users

### Register

- URL

  - `/regist/`

- Method

  - `POST`

- Request Body

  - `name` as `string`
  - `email` as `string` must be unique.
  - `password` as `string`
  - `confPassword` as `string`

    <br/>

  ```
  {
    "username": "user12",
    "email": "user321@example.com",
    "password": "user321",
    "confPassword": "user321"
  }
  ```

- Response _(success)_

  ```
  {
    "message": "Register Berhasil"
  }
  ```

- Response _(fail)_
  ```
  {
    "error": false,
    "message": 'Email atau username sudah digunakan'
  }
  ```

### Login

- URL

  - `/login`

- Method

  - `POST`

- Request Body

  - `email` as `string` must be unique.
  - `password` as `string`

    <br/>

  ```
  {
    "email": "user123@example.com"
    "password": "user123",
  }
  ```

- Response _(success)_

  ```
  {
    "user_id": 6,
    "username": " test4",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsIm5hbWUiOiIgdGVzdDQiLCJlbWFpbCI6IiB0ZXN0NEBnbWFpbC5jb20iLCJpYXQiOjE3MDMyMzc5NDMsImV4cCI6MTcwMzI4MTE0M30.FempWy5Kul63LBT3XJFzpa7_zzqAHdY0McB9AAYC4tI"
  }
  ```

- Response _(fail)_
  ```
  {
    "message": "Wrong Password" or "User not found"
  }
  ```
