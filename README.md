# pembelajaran_itc

---

## Installation

You need to install node v16.14.2 https://nodejs.org/en/blog/release/v16.14.2/ or latest https://nodejs.org/en/download/ \
You need to install all package with command:

```text
npm install
```

Create database MySQL with command:

```text
npx sequelize db:create
```

Create a table automatically with command:

```text
npx sequelize db:migrate
```

Insert data into tables from all seeders with command:

```text
npx sequelize-cli db:seed:all
```

You can run specific seeder with following command:

```text
 npx sequelize-cli db:seed --seed <name file.js>
```

Before start, create a .env file with contents like .env.example \
Start API with command:

```text
npm run start
```

or

```text
npm run start-dev
```

\
If you want to Drop Database, you can do it with terminal command:

```text
 npx sequelize db:drop
```
\
For more information about sequelize check the [documentation](https://sequelize.org/docs/v6/).

## Table of Contents

- [Pembelajaran_itc](#pembelajaran-itc)
  - [Table of Contents](#table-of-contents)
  - [User](#user)
    - [Register User](#register-user)
    - [Login User](#login-user)
    - [Fetch User](#fetch-user)
    - [Refresh Token](#refresh-token)
    - [Link Reset Password](#link-reset-password)
    - [Reset Password](#reset-password)
    - [Update Profile](#update-profile)
    - [Change Password](change-password)
    - [Update Profile and Password](#update-profile-and-password)
  - [Division](#division)
    - [Fetch All Divisions](#fetch-all-divisions)
  - [Role](#role)
    - [Fetch All Roles](#fetch-all-roles)
  - [Course](#course)
    - [Fetch All Courses](#fetch-all-courses)
    - [Store Course](#store-course)
    - [Modify Course](#modify-course)
    - [Delete Course](#delete-course)
  - [Chapter](#chapter)
    - [Fetch All Chapters by Course id](#fetch-all-chapters-by-course-id)
    - [Fetch All Chapters and Title Articles by Course id](#fetch-all-chapters-and-title-articles-by-course-id)
    - [Store Chapter](#store-chapter)
    - [Modify Chapter](#modify-chapter)
    - [Delete Chapter](#delete-chapter)
  - [Article](#article)
    - [Fetch All Articles by Chapter Id](#fetch-all-articles-by-chapter-id)
    - [Fetch Article by Article Id](#fetch-article-by-article-id)
    - [Store Content and Title Article](#store-content-and-title-article)
    - [Store Image](#store-image)
    - [Modify Content and Title Article](#modify-content-and-title-article)
    - [Delete Article](#delete-article)
    - [Delete Image Article](#delete-image-article)
  - [Discussion](#discussion)
    - [Fetch All Discussions by Course Id](#fetch-all-discussions-by-course-id)
    - [Fetch Discussion by Discussion Id](#fetch-discussion-by-discussion-id)
    - [Store Discussion](#store-discussion)
    - [Modify Discussion](#modify-discussion)
    - [Delete Discussion](#delete-discussion)
  - [Comment](#comment)
    - [Fetch All Comments by Discussion Id](#fetch-all-comments-by-discussion-id)
    - [Store Comment](#store-comment)
    - [Modify Comment](#modify-comment)
    - [Delete Comment](#delete-comment)

---

## User

### Register User

Endpoint

```text
POST /users/register
```

Body

```json
{
  "username": "John",
  "fullName": "John Doe",
  "email": "johndoe@gmail.com",
  "password": "secret123",
  "id_division": 2
}
```

Response

```json
{
  "status": "success",
  "message": "Successfully register user",
}
```

### Login User

Endpoint

```text
POST /users/login
```

Body

```json
{
  "emailUsername": "johndoe@gmail.com",
  "password": "secret123"
}
```

Response

```json
{
    "status": "success",
    "data": {
        "user": {
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc2NTQ4NDM3LCJleHAiOjE2NzY1NDk2Mzd9.rclqrnlpDM0azxP675qQkCvck5Q54R4uYlzWcvYzREE",
            "refreshToken": "WyDIsd1xR9p023YLw1W1uhSUiM8RAIwiNVX2K1OO6vf1sugeexNwPFf2dMMZdK4Iqf4V31qz3Wqhd4vl4yDbNJEv9QVwAU7OEUctsG6V6i7ohYunZLCtCMlyf1gMBMoH3p8NdQL4xMQfFtneqKGCEDSufCuU7RoDqrGqQYIWUWeyh7RxG4MaDc6ZYM1eSImQQ2sqClmSEP6EmBOJOCNzA181TRdiypCbtHmZWb1Rmy5FUIbmi4MIquIRYehR23Oe"
        }
    }
}
```

### Fetch User

Endpoint

```text
GET /users/:id => /users/1
```

Response

```json
{
  "status": "success",
  "message": "Successfully get user by id",
  "data": {
    "id": 1,
    "username": "John",
    "fullName": "John Doe",
    "email": "johndoe@gmail.com",
    "generation": null,
    "phoneNumber": null,
    "id_division": 2,
    "id_role": 1
  }
}
```

### Refresh Token

```text
POST /users/refresh-token
```

Body

```json
{
  "username": "John",
  "refreshToken": "8TgRNSUhAza7zaa3bMVmPYOa1l8RKy6YXjd0FDgCdeAStHvhwWbJqayvxWVlstBMfBn0jokn4KOA7XvQs73tqi3NHnvPqV2rMkZhVPz1Va87wfI500SAbh5Ie8i42oxh4MGBFkESIXwPilew6HVsLe0y4uoR6Vbn1jqvHLi2oZEeZyHxkWcUn1H2c7YKAjklnQPSyNTh1GcA0NsNh9O0KqNfGNEFHg6JaZcCyiDN3feRns9oizDz7TSopcQr3frp"
}
```

Response

```json
{
  "status": "success",
  "message": "Successfully refresh access token",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJyaW8xMjM0NTY3ODkxMjNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJiaW50YW5nMDEiLCJyb2xlIjoidXNlciIsImlkX3JvbGUiOjEsImRpdmlzaW9uIjoiQmFjay1lbmQgRGV2ZWxvcGVyIiwiaWRfZGl2aXNpb24iOjEsImlhdCI6MTY2Nzg4NTk5MiwiZXhwIjoxNjY3ODg3MTkyLCJzdWIiOiJiaW50YW5nMDEifQ.SLhjrW1t3DAth06BK_4E-FMyLgzaoyYy2tJzq87HpEw"
  }
}
```

### Link Reset Password

Endpoint

```text
POST /reset-password/
```

Request

```json
{
  "email": "johndoe@gmail.com"
}
```

Response

```json
{
  "status": "success",
  "message": "email sent successfully"
}
```

### Reset Password

Endpoint

```text
POST /:id_user/:token
```

Request

```json
{
  "password": "passwordsecret"
}
```

Response

```json
{
  "status": "success",
  "message": "Password reset successfully"
}
```

### Update Profile

Endpoint

```text
PUT /users/update/:id => /users/update/1
```

Request

```json
{
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYWlzYWxyZXphQGZhaXNhbC5jb20iLCJ1c2VybmFtZSI6ImFkbWluaXRjIiwicm9sZSI6ImFkbWluIiwiaWRfcm9sZSI6MiwiZGl2aXNpb24iOiJNb2JpbGUgRGV2ZWxvcGVyIiwiaWRfZGl2aXNpb24iOjMsImlhdCI6MTY3NTc1MDIyMSwiZXhwIjoxNjc1NzUxNDIxLCJzdWIiOiJhZG1pbml0YyJ9.Y3f-E7qKBk3qbtqXIlQZeFiy7WQFQwKkwPiVcrcxAPk",
        "type": "string"
      }
    ]
  },
  "body": {
    "mode": "formdata",
    "formdata": [
      {
        "key": "image",
        "type": "file",
        "src": "/D:/Home/Pictures/test.png"
      },
      {
        "key": "username",
        "value": "adminitc",
        "type": "text",
        "disabled": true
      },
      {
        "key": "fullName",
        "value": "Faisalll",
        "type": "text"
      },
      {
        "key": "email",
        "value": "faisalreza@faisal.com",
        "type": "text",
        "disabled": true
      },
      {
        "key": "generation",
        "value": "2020",
        "type": "text"
      },
      {
        "key": "phoneNumber",
        "value": "081000000000",
        "type": "text"
      },
      {
        "key": "id_division",
        "value": "3",
        "type": "text"
      },
      {
        "key": "password",
        "value": "secret123",
        "type": "text",
        "disabled": true
      }
    ]
  }
}
```

Response

```json
{
  "status": "success",
  "message": "Successfully update User"
}
```

### Change Password

Endpoint

```text
PUT /users/changepassword => /users/changepassword
```

Request

```json
{
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYWlzYWxyZXphQGZhaXNhbC5jb20iLCJ1c2VybmFtZSI6ImFkbWluaXRjIiwicm9sZSI6ImFkbWluIiwiaWRfcm9sZSI6MiwiZGl2aXNpb24iOiJNb2JpbGUgRGV2ZWxvcGVyIiwiaWRfZGl2aXNpb24iOjMsImlhdCI6MTY3NTc1MDIyMSwiZXhwIjoxNjc1NzUxNDIxLCJzdWIiOiJhZG1pbml0YyJ9.Y3f-E7qKBk3qbtqXIlQZeFiy7WQFQwKkwPiVcrcxAPk",
        "type": "string"
      }
    ]
  },
  "body": {
    "password": "secret123"
  }
}
```

Response

```json
{
  "status": "success",
  "message": "Successfully change password User"
}
```

### Update Profile and Password

Endpoint

```text
PUT /users/updateprofilepassword => /users/updateprofilepassword
```

Request

```json
{
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYWlzYWxyZXphQGZhaXNhbC5jb20iLCJ1c2VybmFtZSI6ImFkbWluaXRjIiwicm9sZSI6ImFkbWluIiwiaWRfcm9sZSI6MiwiZGl2aXNpb24iOiJNb2JpbGUgRGV2ZWxvcGVyIiwiaWRfZGl2aXNpb24iOjMsImlhdCI6MTY3NTc1MDIyMSwiZXhwIjoxNjc1NzUxNDIxLCJzdWIiOiJhZG1pbml0YyJ9.Y3f-E7qKBk3qbtqXIlQZeFiy7WQFQwKkwPiVcrcxAPk",
        "type": "string"
      }
    ]
  },
  "body": {
    "mode": "formdata",
    "formdata": [
      {
        "key": "image",
        "type": "file",
        "src": "/D:/Home/Pictures/test.png"
      },
      {
        "key": "username",
        "value": "adminitc",
        "type": "text"
      },
      {
        "key": "fullName",
        "value": "Faisalll",
        "type": "text"
      },
      {
        "key": "email",
        "value": "faisalreza@faisal.com",
        "type": "text"
      },
      {
        "key": "generation",
        "value": "2020",
        "type": "text"
      },
      {
        "key": "phoneNumber",
        "value": "081000000000",
        "type": "text"
      },
      {
        "key": "id_division",
        "value": "3",
        "type": "text"
      },
      {
        "key": "password",
        "value": "secret123",
        "type": "text"
      }
    ]
  }
}
```

Response

```json
{
  "status": "success",
  "message": "Successfully update User"
}
```

---

## Division

### Fetch All Divisions

Endpoint

```text
GET /divisions
```

Response

```json
{
  "status": "success",
  "message": "Successfully get division",
  "data": [
    {
      "id": 1,
      "divisionName": "Back End"
    },
    {
      "id": 2,
      "divisionName": "Front End"
    },
    {
      "id": 3,
      "divisionName": "Mobile"
    }
  ]
}
```

---

## Role

### Fetch All Roles

Endpoint

```text
GET /roles
```

Response

```json
{
  "status": "success",
  "message": "Successfully get role",
  "data": [
    {
      "id": 1,
      "roleName": "User"
    },
    {
      "id": 2,
      "roleName": "Admin"
    }
  ]
}
```

---

## Course

### Fetch All Courses

Endpoint

```text
GET /courses
```

Response

```json
{
  "status": "success",
  "message": "Successfully get all courses",
  "data": [
    {
      "id": 3,
      "title": "Lorem ipsum",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia error libero explicabo deserunt, eum quos",
      "image_thumbnail": "https://res.cloudinary.com/dd6stok7k/image/upload/v1667654597/itc-repo/course/sgvgxlblqkis0yh5ikfq.jpg",
      "cloudinary_id": "sgvgxlblqkis0yh5ikfq",
      "createdAt": "2022-11-05T13:23:17.000Z",
      "updatedAt": "2022-11-05T13:23:17.000Z",
      "id_division": 2,
      "id_user": 2
    }
  ]
}
```

### Store Course

Endpoint

```text
POST /courses
```

Request

```json
{
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqYW5lZG9lQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiSmFuZSIsInJvbGUiOiJVc2VyIiwiaWRfcm9sZSI6MSwiZGl2aXNpb24iOiJGcm9udC1lbmQgRGV2ZWxvcGVyIiwiaWRfZGl2aXNpb24iOjIsImlhdCI6MTY2NzY1MzkzMCwiZXhwIjoxNjY3NjU1MTMwLCJzdWIiOiJKYW5lIn0.zKZfP9hJua9nYhAshczMTisL0mthOEds0uxMkww7ots"
      }
    ]
  },
  "body": {
    "mode": "formdata",
    "formdata": [
      {
        "key": "title",
        "value": "Lorem ipsum",
        "type": "text"
      },
      {
        "key": "description",
        "value": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia error libero explicabo deserunt, eum quos",
        "type": "text"
      },
      {
        "key": "image",
        "type": "file",
        "src": "/D:/Home/Pictures/test.jpg"
      },
      {
        "key": "id_division",
        "value": "2",
        "type": "text"
      },
      {
        "key": "id_user",
        "value": "2",
        "type": "text"
      }
    ]
  }
}
```

Response

```json
{
  "status": "success",
  "message": "Successfully create course",
  "data": {
    "id": 2,
    "title": "Lorem ipsum",
    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia error libero explicabo deserunt, eum quos",
    "image_thumbnail": "https://res.cloudinary.com/dd6stok7k/image/upload/v1667654432/itc-repo/course/it7ejg37zr9br9advbxz.jpg",
    "cloudinary_id": "it7ejg37zr9br9advbxz",
    "id_division": 2,
    "id_user": 2,
    "updatedAt": "2022-11-05T13:20:33.206Z",
    "createdAt": "2022-11-05T13:20:33.206Z"
  }
}
```

### Modify Course

Endpoint

```text
PUT /courses/:id => /courses/2
```

Request

```json
{
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqYW5lZG9lQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiSmFuZSIsInJvbGUiOiJVc2VyIiwiaWRfcm9sZSI6MSwiZGl2aXNpb24iOiJGcm9udC1lbmQgRGV2ZWxvcGVyIiwiaWRfZGl2aXNpb24iOjIsImlhdCI6MTY2NzY1NTE3NiwiZXhwIjoxNjY3NjU2Mzc2LCJzdWIiOiJKYW5lIn0.XH4xzH3xgb7yX9mZqobxEeRVr9Os6AxnFgA86EetAHw"
      }
    ]
  },
  "body": {
    "mode": "formdata",
    "formdata": [
      {
        "key": "title",
        "value": "Lorem ipsum edited",
        "type": "text"
      },
      {
        "key": "description",
        "value": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia error libero explicabo deserunt, eum quos",
        "type": "text"
      },
      {
        "key": "image",
        "type": "file",
        "src": "/D:/Home/Pictures/test.jpg"
      },
      {
        "key": "id_division",
        "value": "2",
        "type": "text"
      }
    ]
  }
}
```

Response

```json
{
  "status": "success",
  "message": "Successfully update course",
  "data": {
    "id": 2,
    "title": "Lorem ipsum edited",
    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia error libero explicabo deserunt, eum quos",
    "image_thumbnail": "https://res.cloudinary.com/dd6stok7k/image/upload/v1667654432/itc-repo/course/it7ejg37zr9br9advbxz.jpg",
    "cloudinary_id": "it7ejg37zr9br9advbxz",
    "createdAt": "2022-11-05T13:20:33.000Z",
    "updatedAt": "2022-11-05T13:34:11.374Z",
    "id_division": 2,
    "id_user": 2
  }
}
```

### Delete Course

Endpoint

```text
DELETE /courses/:id => /courses/2
```

Request

```json
{
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqYW5lZG9lQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiSmFuZSIsInJvbGUiOiJVc2VyIiwiaWRfcm9sZSI6MSwiZGl2aXNpb24iOiJGcm9udC1lbmQgRGV2ZWxvcGVyIiwiaWRfZGl2aXNpb24iOjIsImlhdCI6MTY2NzY1NTM3NCwiZXhwIjoxNjY3NjU2NTc0LCJzdWIiOiJKYW5lIn0.bthhCnOrZCgyv0SrC6UwniBou3Wf3K_JrG2Hq_5LSBc"
      }
    ]
  }
}
```

Response

```json
{
  "status": "success",
  "message": "Successfully delete course"
}
```

---

## Chapter

### Fetch All Chapters by Course id

Endpoint

```text
GET /courses/:id_course/chapter
```

Response

```json
{
  "status": "success",
  "message": "Successfully get all chapters by specific course",
  "data": [
    {
      "id": 1,
      "title": "tipe data",
      "createdAt": "2022-11-14T14:07:13.000Z",
      "updatedAt": "2022-11-14T14:07:13.000Z",
      "id_course": 1
    },
    {
      "id": 2,
      "title": "looping",
      "createdAt": "2022-11-14T14:07:45.000Z",
      "updatedAt": "2022-11-14T14:07:45.000Z",
      "id_course": 1
    }
  ]
}
```

### Fetch All Chapters and Title Articles by Course id

Endpoint

```text
GET courses/:id_course/chapter/article
```

Response

```json
{
    {
    "status": "success",
    "message": "Successfully get all chapters by specific course",
    "data": [
        {
            "id": 1,
            "title": "looping while",
            "createdAt": "2023-01-19T12:55:02.000Z",
            "updatedAt": "2023-01-19T12:55:02.000Z",
            "id_course": 1,
            "Articles": [
                {
                    "id": 1,
                    "title": "Percabangan",
                    "id_chapter": 1
                },
                {
                    "id": 2,
                    "title": "Percabangan",
                    "id_chapter": 1
                }
            ]
        },
        {
            "id": 2,
            "title": "looping while",
            "createdAt": "2023-01-19T12:55:04.000Z",
            "updatedAt": "2023-01-19T12:55:04.000Z",
            "id_course": 1,
            "Articles": [
                {
                    "id": 3,
                    "title": "Percabangan",
                    "id_chapter": 2
                }
            ]
        },
        {
            "id": 3,
            "title": "looping while",
            "createdAt": "2023-01-19T13:05:12.000Z",
            "updatedAt": "2023-01-19T13:05:12.000Z",
            "id_course": 1,
            "Articles": [
                {
                    "id": 4,
                    "title": "Percabangan",
                    "id_chapter": 3
                }
            ]
        }
    ]
}
}
```

### Store Chapter

Endpoint

```text
POST /courses/:id_course/chapters
```

Request

```json
{
  "title": "looping while"
}
```

Response

```json
{
  "status": "success",
  "message": "Successfully add chapter",
  "data": {
    "id": 16,
    "title": "looping while",
    "id_course": "2",
    "updatedAt": "2022-11-15T10:15:39.194Z",
    "createdAt": "2022-11-15T10:15:39.194Z"
  }
}
```

### Modify Chapter

Endpoint

```text
PUT /courses/:id_course/chapters/:id_chapter
```

Request

```json
{
  "title": "looping while and for"
}
```

Response

```json
{
  "status": "success",
  "message": "Successfully update Chapter",
  "data": {
    "id": 16,
    "title": "looping while and for",
    "createdAt": "2022-11-15T10:15:39.000Z",
    "updatedAt": "2022-11-15T10:19:22.446Z",
    "id_course": 2
  }
}
```

### Delete Chapter

Endpoint

```text
DELETE /courses/:id_course/chapters/:id_chapter
```

Response

```json
{
  "status": "success",
  "message": "Successfully delete chapter"
}
```

---

## Article

### Fetch All Articles by Chapter Id

Endpoint

```text
GET /courses/:id_course/chapters/:id_chapter/articles => /courses/1/chapters/1/articles
```

Request

```json
{
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqYW5lZG9lQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiSmFuZSIsInJvbGUiOiJ1c2VyIiwiaWRfcm9sZSI6MSwiZGl2aXNpb24iOiJGcm9udC1lbmQgRGV2ZWxvcGVyIiwiaWRfZGl2aXNpb24iOjIsImlhdCI6MTY3NTMzOTQ3MywiZXhwIjoxNjc1MzQwNjczLCJzdWIiOiJKYW5lIn0.nt1JLE-JKwsm9O_KEXP1vvJSlv30d5lkyOTJwWd09vo",
        "type": "string"
      }
    ]
  }
}
```

Response

```json
{
  "status": "success",
  "message": "Successfully get all title article by specific chapter",
  "data": [
    {
      "id": 1,
      "title": "Article 1",
      "body": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor tortor mauris, et dictum lorem blandit quis. Aenean semper sed.</p>",
      "createdAt": "2023-02-02T09:37:28.000Z",
      "updatedAt": "2023-02-02T09:37:28.000Z",
      "id_chapter": 1
    },
    {
      "id": 2,
      "title": "Article 2",
      "body": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor tortor mauris, et dictum lorem blandit quis. Aenean semper sed.</p>",
      "createdAt": "2023-02-02T09:37:28.000Z",
      "updatedAt": "2023-02-02T09:37:28.000Z",
      "id_chapter": 1
    },
    {
      "id": 3,
      "title": "Article 3",
      "body": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor tortor mauris, et dictum lorem blandit quis. Aenean semper sed.</p>",
      "createdAt": "2023-02-02T09:37:28.000Z",
      "updatedAt": "2023-02-02T09:37:28.000Z",
      "id_chapter": 1
    }
  ]
}
```

### Fetch Article by Article Id

Endpoint

```text
GET /courses/:id_course/chapters/:id_chapter/articles/:id_article => /courses/1/chapters/1/articles/1
```

Request

```json
{
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqYW5lZG9lQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiSmFuZSIsInJvbGUiOiJ1c2VyIiwiaWRfcm9sZSI6MSwiZGl2aXNpb24iOiJGcm9udC1lbmQgRGV2ZWxvcGVyIiwiaWRfZGl2aXNpb24iOjIsImlhdCI6MTY3NTMzOTQ3MywiZXhwIjoxNjc1MzQwNjczLCJzdWIiOiJKYW5lIn0.nt1JLE-JKwsm9O_KEXP1vvJSlv30d5lkyOTJwWd09vo",
        "type": "string"
      }
    ]
  }
}
```

Response

```json
{
  "status": "success",
  "message": "Successfully get article by id",
  "data": {
    "id": 1,
    "title": "Article 1",
    "body": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor tortor mauris, et dictum lorem blandit quis. Aenean semper sed.</p>",
    "createdAt": "2023-02-02T09:37:28.000Z",
    "updatedAt": "2023-02-02T09:37:28.000Z",
    "id_chapter": 1
  }
}
```

### Store Content and Title Article

Endpoint

```text
POST /courses/:id_course/chapters/:id_chapter/articles => /courses/1/chapters/1/articles
```

Request

```json
{
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqYW5lZG9lQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiSmFuZSIsInJvbGUiOiJhZG1pbiIsImlkX3JvbGUiOjIsImRpdmlzaW9uIjoiRnJvbnQtZW5kIERldmVsb3BlciIsImlkX2RpdmlzaW9uIjoyLCJpYXQiOjE2NzUzNDAwMDIsImV4cCI6MTY3NTM0MTIwMiwic3ViIjoiSmFuZSJ9.vsXX2eGcby6l8DMhbY_iDrzH_Vyq7hjTYhzOak6BaTI",
        "type": "string"
      }
    ]
  },
  "body": {
    "title": "Article 5",
    "content": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor tortor mauris, et dictum lorem blandit quis. Aenean semper sed.</p>"
  }
}
```

Response

```json
{
  "status": "success",
  "message": "Successfully post Article",
  "data": {
    "id": 19,
    "title": "Article 5",
    "body": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor tortor mauris, et dictum lorem blandit quis. Aenean semper sed.</p>",
    "id_chapter": "1",
    "updatedAt": "2023-02-02T12:14:25.302Z",
    "createdAt": "2023-02-02T12:14:25.302Z"
  }
}
```

### Store Image

Endpoint

```text
POST /courses/:id_course/chapters/:id_chapter/articles/image => /courses/1/chapters/1/articles/image
```

Request

```json
{
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqYW5lZG9lQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiSmFuZSIsInJvbGUiOiJhZG1pbiIsImlkX3JvbGUiOjIsImRpdmlzaW9uIjoiRnJvbnQtZW5kIERldmVsb3BlciIsImlkX2RpdmlzaW9uIjoyLCJpYXQiOjE2NzUzNDAwMDIsImV4cCI6MTY3NTM0MTIwMiwic3ViIjoiSmFuZSJ9.vsXX2eGcby6l8DMhbY_iDrzH_Vyq7hjTYhzOak6BaTI",
        "type": "string"
      }
    ]
  },
  "body": {
    "mode": "formdata",
    "formdata": [
      {
        "key": "image",
        "type": "file",
        "src": "/D:/Home/Pictures/Screenshot 2022-04-26 112445.png"
      }
    ]
  }
}
```

Response

```json
{
  "location": "https://res.cloudinary.com/dd6stok7k/image/upload/v1675340399/itc-repo/article/79674ec4f2ef72a86c673bc346b2f5dc_f8eem6.png"
}
```

### Modify Content and Title Article

Endpoint

```text
PUT /courses/:id_course/chapters/:id_chapter/articles/:id_article => /courses/1/chapters/1/articles/1
```

Request

```json
{
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqYW5lZG9lQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiSmFuZSIsInJvbGUiOiJhZG1pbiIsImlkX3JvbGUiOjIsImRpdmlzaW9uIjoiRnJvbnQtZW5kIERldmVsb3BlciIsImlkX2RpdmlzaW9uIjoyLCJpYXQiOjE2NzUzNDAwMDIsImV4cCI6MTY3NTM0MTIwMiwic3ViIjoiSmFuZSJ9.vsXX2eGcby6l8DMhbY_iDrzH_Vyq7hjTYhzOak6BaTI",
        "type": "string"
      }
    ]
  },
  "body": {
    "title": "Article 1 edited",
    "content": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor tortor mauris, et dictum lorem blandit quis. Aenean semper sed.</p>"
  }
}
```

Response

```json
{
  "status": "success",
  "message": "Successfully update Article"
}
```

### Delete Article

Endpoint

```text
DELETE /courses/:id_course/chapters/:id_chapter/articles/:id_article => courses/1/chapters/1/articles/5
```

Request

```json
{
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqYW5lZG9lQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiSmFuZSIsInJvbGUiOiJhZG1pbiIsImlkX3JvbGUiOjIsImRpdmlzaW9uIjoiRnJvbnQtZW5kIERldmVsb3BlciIsImlkX2RpdmlzaW9uIjoyLCJpYXQiOjE2NzUzNDAwMDIsImV4cCI6MTY3NTM0MTIwMiwic3ViIjoiSmFuZSJ9.vsXX2eGcby6l8DMhbY_iDrzH_Vyq7hjTYhzOak6BaTI",
        "type": "string"
      }
    ]
  }
}
```

Response

```json
{
  "status": "success",
  "message": "Successfully delete Article"
}
```

### Delete Image Article

Endpoint

```text
DELETE /courses/:id_course/chapters/:id_chapter/articles/image => /courses/1/chapters/1/articles/image
```

Request

```json
{
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqYW5lZG9lQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiSmFuZSIsInJvbGUiOiJhZG1pbiIsImlkX3JvbGUiOjIsImRpdmlzaW9uIjoiRnJvbnQtZW5kIERldmVsb3BlciIsImlkX2RpdmlzaW9uIjoyLCJpYXQiOjE2NzUzNDAwMDIsImV4cCI6MTY3NTM0MTIwMiwic3ViIjoiSmFuZSJ9.vsXX2eGcby6l8DMhbY_iDrzH_Vyq7hjTYhzOak6BaTI",
        "type": "string"
      }
    ]
  },
  "body": {
    "location": "https://res.cloudinary.com/dd6stok7k/image/upload/v1675340399/itc-repo/article/79674ec4f2ef72a86c673bc346b2f5dc_f8eem6.png"
  }
}
```

Response

```json
{
  "status": "success",
  "message": "Successfully delete Image Article"
}
```

---

## Discussion

### Fetch All Discussions by Course Id

Endpoint

```text
GET /courses/:id_course/discussions => /courses/1/discussions
```

Request

```json
{
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqYW5lZG9lQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiSmFuZSIsInJvbGUiOiJhZG1pbiIsImlkX3JvbGUiOjIsImRpdmlzaW9uIjoiRnJvbnQtZW5kIERldmVsb3BlciIsImlkX2RpdmlzaW9uIjoyLCJpYXQiOjE2NzUzNDQ4NjIsImV4cCI6MTY3NTM0NjA2Miwic3ViIjoiSmFuZSJ9.ztiOPND9jYY-tPWq-4vvTTEFyPZ-SZvry20ruNASE10",
        "type": "string"
      }
    ]
  }
}
```

Response

```json
{
  "status": "success",
  "message": "Successfully get Discussion by Course",
  "data": [
    {
      "id": 1,
      "title": "Discussion 1",
      "body": "Lorem ipsum dolor sit amet",
      "isEdited": false,
      "createdAt": "2023-02-02T09:37:28.000Z",
      "updatedAt": "2023-02-02T09:37:28.000Z",
      "id_user": 1,
      "id_course": 1,
      "User": {
        "fullName": "Faisal",
        "id_division": 3,
        "username": "adminitc"
      }
    },
    {
      "id": 2,
      "title": "Discussion 2",
      "body": "Lorem ipsum dolor sit amet",
      "isEdited": false,
      "createdAt": "2023-02-02T09:37:28.000Z",
      "updatedAt": "2023-02-02T09:37:28.000Z",
      "id_user": 1,
      "id_course": 1,
      "User": {
        "fullName": "Faisal",
        "id_division": 3,
        "username": "adminitc"
      }
    },
    {
      "id": 3,
      "title": "Discussion 3",
      "body": "Lorem ipsum dolor sit amet",
      "isEdited": false,
      "createdAt": "2023-02-02T09:37:28.000Z",
      "updatedAt": "2023-02-02T09:37:28.000Z",
      "id_user": 1,
      "id_course": 1,
      "User": {
        "fullName": "Faisal",
        "id_division": 3,
        "username": "adminitc"
      }
    }
  ]
}
```

### Fetch Discussion by Discussion Id

Endpoint

```text
GET /courses/:id_course/discussions/:id_discussion => /courses/1/discussions/1
```

Request

```json
{
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqYW5lZG9lQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiSmFuZSIsInJvbGUiOiJhZG1pbiIsImlkX3JvbGUiOjIsImRpdmlzaW9uIjoiRnJvbnQtZW5kIERldmVsb3BlciIsImlkX2RpdmlzaW9uIjoyLCJpYXQiOjE2NzUzNDQ4NjIsImV4cCI6MTY3NTM0NjA2Miwic3ViIjoiSmFuZSJ9.ztiOPND9jYY-tPWq-4vvTTEFyPZ-SZvry20ruNASE10",
        "type": "string"
      }
    ]
  }
}
```

Response

```json
{
  "status": "success",
  "message": "Successfully get Discussion by id",
  "data": {
    "id": 1,
    "title": "Discussion 1",
    "body": "Lorem ipsum dolor sit amet",
    "isEdited": false,
    "createdAt": "2023-02-02T09:37:28.000Z",
    "updatedAt": "2023-02-02T09:37:28.000Z",
    "id_user": 1,
    "id_course": 1,
    "User": {
      "fullName": "Faisal",
      "id_division": 3,
      "username": "adminitc"
    }
  }
}
```

### Store Discussion

Endpoint

```text
POST /courses/:id_course/discussions => /courses/1/discussions
```

Request

```json
{
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqYW5lZG9lQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiSmFuZSIsInJvbGUiOiJhZG1pbiIsImlkX3JvbGUiOjIsImRpdmlzaW9uIjoiRnJvbnQtZW5kIERldmVsb3BlciIsImlkX2RpdmlzaW9uIjoyLCJpYXQiOjE2NzUzNDQ4NjIsImV4cCI6MTY3NTM0NjA2Miwic3ViIjoiSmFuZSJ9.ztiOPND9jYY-tPWq-4vvTTEFyPZ-SZvry20ruNASE10",
        "type": "string"
      }
    ]
  },
  "body": {
    "title": "Discussion 4",
    "body": "Lorem ipsum dolor sit amet"
  }
}
```

Response

```json
{
  "status": "success",
  "message": "Successfully post Discussion",
  "data": {
    "id": 6,
    "title": "Discussion 4",
    "body": "Lorem ipsum dolor sit amet",
    "isEdited": false,
    "id_course": "1",
    "id_user": 2,
    "updatedAt": "2023-02-02T13:38:13.537Z",
    "createdAt": "2023-02-02T13:38:13.537Z"
  }
}
```

### Modify Discussion

Endpoint

```text
PUT /courses/:id_course/discussions/:id_discussion => /courses/1/discussions/6
```

Request

```json
{
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqYW5lZG9lQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiSmFuZSIsInJvbGUiOiJhZG1pbiIsImlkX3JvbGUiOjIsImRpdmlzaW9uIjoiRnJvbnQtZW5kIERldmVsb3BlciIsImlkX2RpdmlzaW9uIjoyLCJpYXQiOjE2NzUzNDQ4NjIsImV4cCI6MTY3NTM0NjA2Miwic3ViIjoiSmFuZSJ9.ztiOPND9jYY-tPWq-4vvTTEFyPZ-SZvry20ruNASE10",
        "type": "string"
      }
    ]
  },
  "body": {
    "title": "Discussion 1 edited",
    "body": "Lorem ipsum dolor sit amet"
  }
}
```

Response

```json
{
  "status": "success",
  "message": "Successfully update Discussion"
}
```

### Delete Discussion

Endpoint

```text
DELETE /courses/:id_course/discussions/:id_discussion => /courses/1/discussions/1
```

Request

```json
{
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqYW5lZG9lQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiSmFuZSIsInJvbGUiOiJhZG1pbiIsImlkX3JvbGUiOjIsImRpdmlzaW9uIjoiRnJvbnQtZW5kIERldmVsb3BlciIsImlkX2RpdmlzaW9uIjoyLCJpYXQiOjE2NzUzNDQ4NjIsImV4cCI6MTY3NTM0NjA2Miwic3ViIjoiSmFuZSJ9.ztiOPND9jYY-tPWq-4vvTTEFyPZ-SZvry20ruNASE10",
        "type": "string"
      }
    ]
  }
}
```

Response

```json
{
  "status": "success",
  "message": "Successfully delete Discussion"
}
```

---

## Comment

### Fetch All Comments by Discussion Id

Endpoint

```text
GET /courses/:id_course/discussions/:id_discussion/comments => /courses/1/discussion/2/comments
```

Request

```json
{
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqYW5lZG9lQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiSmFuZSIsInJvbGUiOiJhZG1pbiIsImlkX3JvbGUiOjIsImRpdmlzaW9uIjoiRnJvbnQtZW5kIERldmVsb3BlciIsImlkX2RpdmlzaW9uIjoyLCJpYXQiOjE2NzUzNDQ4NjIsImV4cCI6MTY3NTM0NjA2Miwic3ViIjoiSmFuZSJ9.ztiOPND9jYY-tPWq-4vvTTEFyPZ-SZvry20ruNASE10",
        "type": "string"
      }
    ]
  }
}
```

Response

```json
{
  "status": "success",
  "message": "Successfully get All Comment by Discussion",
  "data": [
    {
      "id": 1,
      "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "isEdited": false,
      "createdAt": "2023-02-02T15:13:30.000Z",
      "updatedAt": "2023-02-02T15:13:30.000Z",
      "id_user": 2,
      "id_discussion": 2,
      "User": {
        "id": 2,
        "fullName": "Jane Doe"
      }
    },
    {
      "id": 2,
      "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "isEdited": false,
      "createdAt": "2023-02-02T15:14:00.000Z",
      "updatedAt": "2023-02-02T15:14:00.000Z",
      "id_user": 2,
      "id_discussion": 2,
      "User": {
        "id": 2,
        "fullName": "Jane Doe"
      }
    }
  ]
}
```

### Store Comment

Endpoint

```text
POST /courses/:id_course/discussions/:id_discussion/comments => /courses/1/discussions/2/comments
```

Request

```json
{
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqYW5lZG9lQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiSmFuZSIsInJvbGUiOiJhZG1pbiIsImlkX3JvbGUiOjIsImRpdmlzaW9uIjoiRnJvbnQtZW5kIERldmVsb3BlciIsImlkX2RpdmlzaW9uIjoyLCJpYXQiOjE2NzUzNDYyNzIsImV4cCI6MTY3NTM0NzQ3Miwic3ViIjoiSmFuZSJ9.lPYkOMepMkD-99DCzw3inMKWHFCHxxQ_Z2ZtDQzy3sY",
        "type": "string"
      }
    ]
  },
  "body": {
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  }
}
```

Response

```json
{
  "status": "success",
  "message": "Successfully post Comment",
  "data": {
    "id": 3,
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "isEdited": false,
    "id_discussion": "2",
    "id_user": 2,
    "updatedAt": "2023-02-02T15:14:00.280Z",
    "createdAt": "2023-02-02T15:14:00.280Z"
  }
}
```

### Modify Comment

Endpoint

```text
PUT /courses/:id_course/discussions/:id_discussion/comments/:id_comment => /courses/1/discussions/2/comments/3
```

Request

```json
{
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqYW5lZG9lQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiSmFuZSIsInJvbGUiOiJhZG1pbiIsImlkX3JvbGUiOjIsImRpdmlzaW9uIjoiRnJvbnQtZW5kIERldmVsb3BlciIsImlkX2RpdmlzaW9uIjoyLCJpYXQiOjE2NzUzNDYyNzIsImV4cCI6MTY3NTM0NzQ3Miwic3ViIjoiSmFuZSJ9.lPYkOMepMkD-99DCzw3inMKWHFCHxxQ_Z2ZtDQzy3sY",
        "type": "string"
      }
    ]
  },
  "body": {
    "body": "edited Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  }
}
```

Response

```json
{
  "status": "success",
  "message": "Successfully update Comment"
}
```

### Delete Comment

Endpoint

```text
DELETE /courses/:id_course/discussions/:id_discussion/comments/:id_comment => courses/1/discussions/2/comments/3
```

Request

```json
{
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqYW5lZG9lQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiSmFuZSIsInJvbGUiOiJhZG1pbiIsImlkX3JvbGUiOjIsImRpdmlzaW9uIjoiRnJvbnQtZW5kIERldmVsb3BlciIsImlkX2RpdmlzaW9uIjoyLCJpYXQiOjE2NzUzNDYyNzIsImV4cCI6MTY3NTM0NzQ3Miwic3ViIjoiSmFuZSJ9.lPYkOMepMkD-99DCzw3inMKWHFCHxxQ_Z2ZtDQzy3sY",
        "type": "string"
      }
    ]
  }
}
```

Response

```json
{
  "status": "success",
  "message": "Successfully delete comment"
}
```

---
