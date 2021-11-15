# API document of online shop project

# 1. illustration of API

- base URL of API: `http://127.0.0.1:3000/`
- the server has enabled CORS cross-domain support
- use token as uniform authorization method
- APIs that require authorization must provide a `token` using the `Authorization` field in the request header
- use HTTP Status Code to identify status
- use JSON as unifirm format of returned data

## 1.1. request methods surpported

- GET
- POST
- PUT
- DELETE
- OPTIONS

## 1.2. illustration of general status code

| *code* | *meaning*                |
| -------- | --------------------- |
| 200      | OK                    |
| 201      | CREATED               |
| 204      | DELETED               |
| 400      | BAD REQUEST           |
| 401      | UNAUTHORIZED          |
| 403      | FORBIDDEN             |
| 404      | NOT FOUND             |
| 422      | Unprocesable entity   |
| 500      | INTERNAL SERVER ERROR |
|          |                       |

------

# 2. login

## 2.1. interface of login verification

- URL: clogin or slogin
- method: post
- params:

| params   |  notes   |
| -------- | -------- |
| email    | required |
| password | required |

- response data

```json
{
    "data": {
        "_id": "618e9ddf1b3c583d534fef73",
        "role": "normal",
        "state": 1,
        "username": "rob",
        "password": "$2b$10$9wvH.lpwwmNDwNxdyqj3VebnvcDdZAQpjb.FQDEoNlCYO1Rn2SvP.",
        "email": "rob@gmail.com",
        "post_code": "CB3 1AA",
        "address": "12 Oxford Road",
        "town_city": "Cambridge",
        "create_time": "2021-11-12T17:01:19.706Z",
        "cart": [],
        "__v": 0,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoibm9ybWFsIiwiaWF0IjoxNjM2NzQyNTU3LCJleHAiOjE2MzY4Mjg5NTd9.5OVWzKnTVq7IVnEVCTx3kOX1M4QbhWywwAEHD4WdWVw"
    },
    "meta": {
        "msg": "login successfully",
        "status": 200
    }
}
```
```json
{
    "data": {
        "_id": "618dc0e5f6d992648273eb15",
        "state": 1,
        "username": "lily",
        "password": "$2b$10$55HyOhTY6ryiCKhwW4ZjrOdXXLY0foVhU3kP9oThaKRWx9UCvTMri",
        "email": "lily@gmail.com",
        "role": "admin",
        "create_time": "2021-11-12T01:18:29.253Z",
        "__v": 0,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzY4NDY1MzksImV4cCI6MTYzNjkzMjkzOX0.Imiw8LJMMTKcfICckq-xUUG6AYdXylx-BjjyLI3tKXE"
    },
    "meta": {
        "msg": "login successfully",
        "status": 200
    }
}
```

------

# 3. user management

## 3.1. user list

- URL: customers or staffs
- method: get
- params:

| params   | illustrations     | notes        |
| -------- | ----------------- | ------------ |
| query    | key words         | not required |
| pagenum  | current page      | required     |
| pagesize | page size         | required     |

- response params

| params     | illustrations           |
| ---------- | ----------------------- |
| totalPages | total number of pages   |
| totalCount | total number of users   |
| pagenum    | current page            |
| users      | array of users          |

- response data

```json
{
    "data": {
        "pagenum": 1,
        "totalCount": 11,
        "totalPages": 3,
        "users": [
            {
                "_id": "618e9ddf1b3c583d534fef73",
                "role": "normal",
                "state": 1,
                "username": "rob",
                "password": "$2b$10$9wvH.lpwwmNDwNxdyqj3VebnvcDdZAQpjb.FQDEoNlCYO1Rn2SvP.",
                "email": "rob@gmail.com",
                "post_code": "CB3 1AA",
                "address": "12 Oxford Road",
                "town_city": "Cambridge",
                "create_time": "2021-11-12T17:01:19.706Z",
                "cart": [],
                "__v": 0
            }
        ]
    },
    "meta": {
        "msg": "get users list successfully",
        "status": 200
    }
}
```
```json
{
    "data": {
        "pagenum": 1,
        "totalCount": 11,
        "totalPages": 3,
        "users": [
            {
                "_id": "618dc0e5f6d992648273eb15",
                "state": 1,
                "username": "lily",
                "password": "$2b$10$55HyOhTY6ryiCKhwW4ZjrOdXXLY0foVhU3kP9oThaKRWx9UCvTMri",
                "email": "lily@gmail.com",
                "role": "admin",
                "create_time": "2021-11-12T01:18:29.253Z",
                "__v": 0
            }
        ]
    },
    "meta": {
        "msg": "get users list successfully",
        "status": 200
    }
}
```

------
