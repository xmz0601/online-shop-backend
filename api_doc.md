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

- path: clogin or slogin
- method: post
- params:

| params   |  notes   |
| -------- | -------- |
| email    | required |
| password | required |

- response data:

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

- path: customers or staffs
- method: get
- params:

| params   | illustrations     | notes        |
| -------- | ----------------- | ------------ |
| query    | key words         | not required |
| pagenum  | current page      | required     |
| pagesize | page size         | required     |

- response params:

| params     | illustrations           |
| ---------- | ----------------------- |
| totalPages | total number of pages   |
| totalCount | total number of users   |
| pagenum    | current page            |
| users      | array of users          |

- response data:

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

## 3.2. add user

- path: customers or staffs
- method: post
- params:

| params      | notes    |
| ----------- | -------- |
| username    | required |
| email       | required |
| password    | required |
| post_code   | required |
| address     | required |
| town_city   | required |

| params      | notes    |
| ----------- | -------- |
| username    | required |
| email       | required |
| password    | required |

- response data:

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
        "__v": 0
    },
    "meta": {
        "msg": "create user successfully",
        "status": 201
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
        "__v": 0
    },
    "meta": {
        "msg": "create user successfully",
        "status": 201
    }
}
```

## 3.3. change user state

- path: customers/:id/state/:state or staffs/:id/state/:state
- method: put
- params:

| params     | notes                         |
| ---------- | ----------------------------- |
| id         | required                      |
| state      | required, value: 0/1          |

- response data:

```json
{
    "data": {
        "_id": "618e9ddf1b3c583d534fef73",
        "role": "normal",
        "state": 0,
        "username": "rob",
        "password": "$2b$10$9wvH.lpwwmNDwNxdyqj3VebnvcDdZAQpjb.FQDEoNlCYO1Rn2SvP.",
        "email": "rob@gmail.com",
        "post_code": "CB3 1AA",
        "address": "12 Oxford Road",
        "town_city": "Cambridge",
        "create_time": "2021-11-12T17:01:19.706Z",
        "cart": [],
        "__v": 0
    },
    "meta": {
        "msg": "change user state successfully",
        "status": 200
    }
}
```
```json
{
    "data": {
        "_id": "618dc0e5f6d992648273eb15",
        "state": 0,
        "username": "lily",
        "password": "$2b$10$55HyOhTY6ryiCKhwW4ZjrOdXXLY0foVhU3kP9oThaKRWx9UCvTMri",
        "email": "lily@gmail.com",
        "role": "admin",
        "create_time": "2021-11-12T01:18:29.253Z",
        "__v": 0
    },
    "meta": {
        "msg": "change user state successfully",
        "status": 200
    }
}
```

## 3.4. query user by id

- path: customers/:id or staffs/:id
- method: get
- params:

| params     | notes                         |
| ---------- | ----------------------------- |
| id         | required                      |

- response data:

```json
{
    "data": {
        "_id": "618e9ddf1b3c583d534fef73",
        "role": "normal",
        "state": 0,
        "username": "rob",
        "password": "$2b$10$9wvH.lpwwmNDwNxdyqj3VebnvcDdZAQpjb.FQDEoNlCYO1Rn2SvP.",
        "email": "rob@gmail.com",
        "post_code": "CB3 1AA",
        "address": "12 Oxford Road",
        "town_city": "Cambridge",
        "create_time": "2021-11-12T17:01:19.706Z",
        "cart": [],
        "__v": 0
    },
    "meta": {
        "msg": "query user successfully",
        "status": 200
    }
}
```
```json
{
    "data": {
        "_id": "618dc0e5f6d992648273eb15",
        "state": 0,
        "username": "lily",
        "password": "$2b$10$55HyOhTY6ryiCKhwW4ZjrOdXXLY0foVhU3kP9oThaKRWx9UCvTMri",
        "email": "lily@gmail.com",
        "role": "admin",
        "create_time": "2021-11-12T01:18:29.253Z",
        "__v": 0
    },
    "meta": {
        "msg": "query user successfully",
        "status": 200
    }
}
```

## 3.5. update user

- path: customers/:id or staffs/:id
- method: put
- params:

| params           | notes                         |
| ---------------- | ----------------------------- |
| username         | required                      |
| post_code        | required                      |
| address          | required                      |
| town_city        | required                      |

| params           | notes                         |
| ---------------- | ----------------------------- |
| username         | required                      |
| role             | required                      |

- response data:

```json
{
    "data": {
        "_id": "618e9ddf1b3c583d534fef73",
        "role": "normal",
        "state": 0,
        "username": "rob123",
        "password": "$2b$10$9wvH.lpwwmNDwNxdyqj3VebnvcDdZAQpjb.FQDEoNlCYO1Rn2SvP.",
        "email": "rob@gmail.com",
        "post_code": "CB3 1AA",
        "address": "12 Oxford Road",
        "town_city": "Cambridge",
        "create_time": "2021-11-12T17:01:19.706Z",
        "cart": [],
        "__v": 0
    },
    "meta": {
        "msg": "update user successfully",
        "status": 200
    }
}
```
```json
{
    "data": {
        "_id": "618dc0e5f6d992648273eb15",
        "state": 0,
        "username": "lily123",
        "password": "$2b$10$55HyOhTY6ryiCKhwW4ZjrOdXXLY0foVhU3kP9oThaKRWx9UCvTMri",
        "email": "lily@gmail.com",
        "role": "admin",
        "create_time": "2021-11-12T01:18:29.253Z",
        "__v": 0
    },
    "meta": {
        "msg": "update user successfully",
        "status": 200
    }
}
```

## 3.6. delete user

- path: customers/:id or staffs/:id
- method: delete
- params:

| params     | notes                         |
| ---------- | ----------------------------- |
| id         | required                      |

- response data:

```json
{
    "data": null,
    "meta": {
        "msg": "delete user successfully",
        "status": 200
    }
}
```

------

# 4. power management

## 4.1. menu list

- path: menus
- method: get

- response data:

```json
{
    "data": [
        {
            "id": 100,
            "authName": "User Management",
            "path": "users",
            "children": [{
                    "id": 101,
                    "authName": "Staff List",
                    "path": "staffs",
                    "children": []
                }
            ]
        }
    ],
    "meta": {
        "msg": "get menu list successfully",
        "status": 200
    }
}
```

------

# 5. category management

## 5.1. category list

- path: categories
- method: get
- params:

| params   | illustrations     | notes                                 |
| -------- | ----------------- | ------------------------------------- |
| level    | 1/2/3             | 1/2/3 means get tier 1/2/3 categories; if this param is missing, then a default value 3 will be added                                          |
| pagenum  | current page      | required                              |
| pagesize | page size         | required                              |

- response params:

| params     | illustrations                |
| ---------- | ---------------------------- |
| totalPages | total number of pages        |
| totalCount | total number of categories   |
| pagenum    | current page                 |
| cates      | array of categories          |

- response data:

```json
{
    "data": {
        "pagenum": 1,
        "totalCount": 6,
        "totalPages": 2,
        "cates": [
            {
                "_id": "61967cd89ef90810b61838e4",
                "create_time": "2021-11-12T01:18:29.253Z",
                "cate_level": 0,
                "cate_name": "Bakery",
                "cate_pid": "0",
                "children": [
                    {
                        "_id": "619684a30c9b531b1b48ff6f",
                        "create_time": "2021-11-12T01:18:29.253Z",
                        "cate_level": 1,
                        "cate_name": "Bread",
                        "cate_pid": "61967cd89ef90810b61838e4",
                        "children": [
                            {
                                "_id": "619699c3d5ad803817d4b6b4",
                                "create_time": "2021-11-12T01:18:29.253Z",
                                "cate_level": 2,
                                "cate_name": "White Bread",
                                "cate_pid": "619684a30c9b531b1b48ff6f",
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "meta": {
        "msg": "get category list successfully",
        "status": 200
    }
}
```

## 5.2. add category

- path: categories
- method: post
- params:

| params      | notes                                                           |
| ----------- | --------------------------------------------------------------- |
| cate_pid    | required; the value should be 0 if a tier 1 category is added   |
| cate_name   | required                                                        |
| cate_level  | required; 0/1/2 means tier 1/2/3 category                       |

- response data:

```json
{
    "data": {
        "_id": "61967cd89ef90810b61838e4",
        "create_time": "2021-11-12T01:18:29.253Z",
        "cate_level": 0,
        "cate_name": "Bakery",
        "cate_pid": "0",
    },
    "meta": {
        "msg": "add new category successfully",
        "status": 201
    }
}
```

## 5.3. query category by id

- path: categories/:id
- method: get
- params:

| params      | notes                                 |
| ----------- | ------------------------------------- |
| id          | required                              |

- response data:

```json
{
    "data": {
        "_id": "61967cd89ef90810b61838e4",
        "create_time": "2021-11-12T01:18:29.253Z",
        "cate_level": 0,
        "cate_name": "Bakery",
        "cate_pid": "0",
    },
    "meta": {
        "msg": "query category successfully",
        "status": 200
    }
}
```

## 5.4. update category

- path: categories/:id
- method: put
- params:

| params      | notes                                       |
| ----------- | ------------------------------------------- |
| id          | required                                    |
| cate_name   | required; add this param in request body    |

- response data:

```json
{
    "data": {
        "_id": "61967cd89ef90810b61838e4",
        "create_time": "2021-11-12T01:18:29.253Z",
        "cate_level": 0,
        "cate_name": "Bakery123",
        "cate_pid": "0",
    },
    "meta": {
        "msg": "update category successfully",
        "status": 200
    }
}
```

## 5.5. delete category

- path: categories/:id
- method: delete
- params:

| params     | notes                         |
| ---------- | ----------------------------- |
| id         | required                      |

- response data:

```json
{
    "data": null,
    "meta": {
        "msg": "delete category successfully",
        "status": 200
    }
}
```

------

# 6. upload files

## 6.1. upload picture

- path: upload
- method: post

- response data:

```json
{
    "data": {
        "img_path": "/uploads/320342a02ab7cb5c247979a01.jpeg",
        "url": "http://127.0.0.1:3000/uploads/320342a02ab7cb5c247979a01.jpeg"
    },
    "meta": {
        "msg": "upload picture successfully",
        "status": 200
    }
}
```

------

# 7. goods management

## 7.1. goods list

- path: goods
- method: get
- params:

| params   | illustrations     | notes        |
| -------- | ----------------- | ------------ |
| query    | key words         | not required |
| cid      | id of category    | not required |
| pagenum  | current page      | required     |
| pagesize | page size         | required     |

- response params:

| params     | illustrations           |
| ---------- | ----------------------- |
| totalPages | total number of pages   |
| totalCount | total number of goods   |
| pagenum    | current page            |
| goods      | array of goods          |

- response data:

```json
{
    "data": {
        "pagenum": 1,
        "totalCount": 10,
        "totalPages": 2,
        "goods": [
            {
                "_id": "619d747c2cfb9341e39d0d3e",
                "name": "Kellogg's Crunchy Nut Corn Flakes",
                "cate_one_id": "61967cbf8414d8108c52ba32",
                "cate_two_id": "619683d96cb3b619e476b8b4",
                "cate_three_id": "619694214b23b13042de1105",
                "create_time": "2021-11-23T23:08:44.215Z",
                "price": 3,
                "weight": 500,
                "storage": "",
                "description": "",
                "ingredients": "",
                "pic": "/uploads/320342a02ab7cb5c247979a01.jpeg"
            }
        ]
    },
    "meta": {
        "msg": "get goods list successfully",
        "status": 200
    }
}
```

## 7.2. add goods

- path: goods
- method: post
- params:

| params          | notes                                   |
| --------------- | --------------------------------------- |
| name            | string, required                        |
| weight          | number, required                        |
| price           | number, required                        |
| cate_one_id     | id of tier 1 category, string, required |
| cate_two_id     | id of tier 2 category, string, required |
| cate_three_id   | id of tier 3 category, string, required |
| pic             | path of image, string, not required     |
| description     | string, not required                    |
| ingredients     | string, not required                    |
| storage         | string, not required                    |

- response data:

```json
{
    "data": {
        "_id": "619d747c2cfb9341e39d0d3e",
        "name": "Kellogg's Crunchy Nut Corn Flakes",
        "cate_one_id": "61967cbf8414d8108c52ba32",
        "cate_two_id": "619683d96cb3b619e476b8b4",
        "cate_three_id": "619694214b23b13042de1105",
        "create_time": "2021-11-23T23:08:44.215Z",
        "price": 3,
        "weight": 500,
        "storage": "",
        "description": "",
        "ingredients": "",
        "pic": "/uploads/320342a02ab7cb5c247979a01.jpeg"
    },
    "meta": {
        "msg": "create goods successfully",
        "status": 201
    }
}
```

## 7.3. query goods by id

- path: goods/:id
- method: get
- params:

| params     | notes                         |
| ---------- | ----------------------------- |
| id         | required                      |

- response data:

```json
{
    "data": {
        "_id": "619d747c2cfb9341e39d0d3e",
        "name": "Kellogg's Crunchy Nut Corn Flakes",
        "cate_one_id": "61967cbf8414d8108c52ba32",
        "cate_two_id": "619683d96cb3b619e476b8b4",
        "cate_three_id": "619694214b23b13042de1105",
        "create_time": "2021-11-23T23:08:44.215Z",
        "price": 3,
        "weight": 500,
        "storage": "",
        "description": "",
        "ingredients": "",
        "pic": "/uploads/320342a02ab7cb5c247979a01.jpeg"
    },
    "meta": {
        "msg": "query goods successfully",
        "status": 200
    }
}
```

## 7.4. update goods

- path: goods/:id
- method: put
- params:

| params          | notes                                   |
| --------------- | --------------------------------------- |
| id              | required                                |
| name            | string, required                        |
| weight          | number, required                        |
| price           | number, required                        |
| pic             | path of image, string, not required     |
| description     | string, not required                    |
| ingredients     | string, not required                    |
| storage         | string, not required                    |

- response data:

```json
{
    "data": {
        "_id": "619d747c2cfb9341e39d0d3e",
        "name": "Kellogg's Crunchy Nut Corn Flakes",
        "cate_one_id": "61967cbf8414d8108c52ba32",
        "cate_two_id": "619683d96cb3b619e476b8b4",
        "cate_three_id": "619694214b23b13042de1105",
        "create_time": "2021-11-23T23:08:44.215Z",
        "price": 3,
        "weight": 500,
        "storage": "",
        "description": "",
        "ingredients": "",
        "pic": "/uploads/320342a02ab7cb5c247979a01.jpeg"
    },
    "meta": {
        "msg": "update goods successfully",
        "status": 200
    }
}
```

## 7.5. delete goods

- path: goods/:id
- method: delete
- params:

| params     | notes                         |
| ---------- | ----------------------------- |
| id         | required                      |

- response data:

```json
{
    "data": null,
    "meta": {
        "msg": "delete goods successfully",
        "status": 200
    }
}
```
