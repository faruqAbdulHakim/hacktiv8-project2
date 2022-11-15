### KETERANGAN

- authentication: keterangan untuk setiap enpoint yang diakses harus melakukan login dan memiliki akses token
- authorization: keterangan untuk setiap enpoint yang diakses harus milik user tersebut

### Create Comment

- endpoint untuk menambahkan data comment
  | method | endpoint | authentication | authorization |
  | ------ | --------- | -------------- | ------------- |
  | POST | /comments | Y | Y |

- value yang dikirimkan pada request body

| body (json) |
| ----------- |
| comment     |
| PhotoId     |

- response json

```js
{
  comment: {
    id: 1,
    comment: "foto kucing ini sangat cantik",
    UserId: 1,
    PhotoId: 1,
    updatedAt: "2022-11-15T16:58:17.562Z",
    createdAt: "2022-11-15T16:58:17.562Z"

  }
}
```

### Get All Comments

- endpoint untuk menampilkan semua data comments

| method | endpoint  | authentication | authorization |
| ------ | --------- | -------------- | ------------- |
| GET    | /comments | Y              | Y             |

- response json

```js
{
  comments: [
    {
      id: 1,
      comment: 'Ini comment untuk photo 1 yaitu kucing',
      createdAt: '2022-11-09T11:00:43.451Z',
      updatedAt: '2022-11-09T11:00:43.451Z',
      Photo: {
        id: 1,
        title: 'Kucing persia',
        caption:
          'ini photo kucing persia yang sangat langka, jarang orang memilikinya',
        poster_image_url: 'http://www.perdanaphoto/photokucingpersia.png',
      },
      User: {
        id: 1,
        username: 'perdanaph27',
        profile_image_url: 'http://www.profile/myphoto.png',
        phone_number: '082134927567',
      },
      UserId: 1,
      PhotoId: 1,
    },
  ]
}
```

### Edit Photo

- endpoint untuk mengedit data comment sesuai dengan parameter id

| method | endpoint                       | authentication | authorization |
| ------ | ------------------------------ | -------------- | ------------- |
| PUT    | /comments/:{params: commentId} | Y              | Y             |

- value yang dikirimkan pada request body

| body (json) |
| ----------- |
| comments    |

- response json

```js
{
  comment: {
    id: 1,
    UserId: 1,
    PhotoId: 1,
    comment: "Kucing persia memiliki bulu yang lebat",
    createdAt: "2022-11-09T11:00:43.451Z",
    updatedAt: "2022-11-15T17:17:54.954Z"
  }
}
```

### Delete comment

- Mendelete data comment sesuai dengan parameter id

| method | endpoint                       | authentication | authorization |
| ------ | ------------------------------ | -------------- | ------------- |
| DELETE | /comments/:{params: commentId} | Y              | Y             |

- response json

```js
{
  message: 'Your comment has been successfully deleted';
}
```
