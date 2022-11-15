### register user

- digunakan untuk register user

| method | endpoint        | authentication |
| ------ | --------------- | -------------- |
| POST   | /users/register | N              |

- value yang dikirimkan pada request body

| name              |
| ----------------- |
| email             |
| full_name         |
| username          |
| password          |
| profile_image_url |
| age               |
| phone_number      |

- response json

```js
{
  user: {
    email: "perdanaph@gmail.com",
    full_name: "perdana putro",
    username: "perdanaph",
    profile_image_url: "http://www.profile/myphoto.png",
    age: 12,
    phone_number: "082134927123"
  }
}
```

### login user

- digunakan untuk login user

| method | endpoint     | authentication |
| ------ | ------------ | -------------- |
| POST   | /users/login | N              |

- value yang dikirimkan pada request body

| name     |
| -------- |
| email    |
| password |

- response json

```js
{
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJwZXJkYW5hcGhAZ21haWwuY29tIiwiaWF0IjoxNjY4NTAxOTk1fQ.NMLTxXF_lz6m6oUCAC2OArlmWcFIcHqYmSH2xP4';
}
```

### update user

- digunakan untuk update data user

| method | endpoint | authentication | autorization |
| ------ | ------------------------ | -------------- | ------------ |
| PUT | /users/:{param: userId} | Y | Y |

- value yang dikirimkan pada request body

| name              |
| ----------------- |
| email             |
| full_name         |
| username          |
| profile_image_url |
| age               |
| phone_number      |

- response json

```js
{
  user: {
    email: "perdana@gmail.com",
    full_name: "perdana putro",
    username: "perdana27",
    profile_image_url: "http://www.profile/myphoto.png",
    age: 12,
    phone_number: "082134927123"
  }
}
```

### delete user

- digunakan untuk delete data user
| method | endpoint | authentication | autorization |
| ------ | ------------------------ | -------------- | ------------ |
| DELETE | /users/:{param: userId} | Y | Y |

- response json

```js
{
  message: 'Your account has been successfully deleted';
}
```
