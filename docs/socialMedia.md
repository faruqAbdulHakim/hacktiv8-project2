### KETERANGAN

- authentication: keterangan untuk setiap enpoint yang diakses harus melakukan login dan memiliki akses token
- authorization: keterangan untuk setiap enpoint yang diakses harus milik user tersebut

### Create Social Media

- endpoint untuk menambah data social media

| method | endpoint      | authentication | authorization |
| ------ | ------------- | -------------- | ------------- |
| POST   | /socialmedias | Y              | Y             |

- value yang dikirimkan pada request body

| body (json)      |
| ---------------- |
| name             |
| social_media_url |

- response json

```js
{
  social_media: {
    id: 1,
    name: "perdanaph",
    social_media_url: "http://www.twitter.com/perdanaph",
    UserId: 1,
    updatedAt: "2022-11-15T17:24:50.316Z",
    createdAt: "2022-11-15T17:24:50.316Z"
  }
}
```

### Get All Social Medias

- endpoint untuk menampilkan semua data social media

| method | endpoint      | authentication | authorization |
| ------ | ------------- | -------------- | ------------- |
| GET    | /socialmedias | Y              | Y             |

- response json

```js
{
  social_medias: [
    {
      id: 1,
      name: 'perdanaph',
      social_media_url: 'http://www.twitter.com/perdanaph',
      UserId: 1,
      updatedAt: '2022-11-15T17:24:50.316Z',
      createdAt: '2022-11-15T17:24:50.316Z',
      User: {
        id: 1,
        username: 'perdanaph',
        profile_image_url: 'http://www.profile/myphoto.png',
      },
    },
  ]
}
```

### Edit Social Media

- endpoint untuk mengedit data social media

| method | endpoint                               | authentication | authorization |
| ------ | -------------------------------------- | -------------- | ------------- |
| PUT    | /socialmedias/:{params: socialMediaId} | Y              | Y             |

- value yang dikirimkan pada body

| body (json)      |
| ---------------- |
| name             |
| social_media_url |

- response json

```js
{
  social_media: {
    id: 1,
    name: "perdana_ph",
    social_media_url: "http://www.twitter.com/perdana_ph",
    UserId: 1,
    updatedAt: "2022-11-15T17:24:50.316Z",
    createdAt: "2022-11-15T17:24:50.316Z"
  }
}
```

### Delete comment

- endpoint untuk menghapus data comment sesuai dengan parameter id

| method | endpoint                               | authentication | authorization |
| ------ | -------------------------------------- | -------------- | ------------- |
| DELETE | /socialmedias/:{params: socialMediaId} | Y              | Y             |

- response json

```js
{
  message: 'Your social media has been successfully deleted';
}
```
