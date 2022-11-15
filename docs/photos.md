### KETERANGAN

- authentication: keterangan untuk setiap enpoint yang diakses harus melakukan login dan memiliki akses token
- authorization: keterangan untuk setiap enpoint yang diakses harus milik user tersebut

### Create Photo

- endpoint untuk menambah data photo

| method | endpoint | authentication | authorization |
| ------ | -------- | -------------- | ------------- |
| POST   | /photos  | Y              | Y             |

- value yang dikirimkan pada request body

| body (json)      |
| ---------------- |
| poster_image_url |
| title            |
| caption          |

- response json

```js
{
  id: 1,
  poster_image_url: "http://www.photo.com/cat.png",
  title: "Photo Cat",
  caption: "Ini adalah poto kucing",
  UserId: 1,
}
```

### Get All Photo

- endpoint untuk mengambil semua data photo sesuai dengan UserId

| method | endpoint | authentication | authorization |
| ------ | -------- | -------------- | ------------- |
| GET    | /photos  | Y              | Y             |

- response json

```js
{
  photos: [
    {
      id: 1,
      title: 'Kucing persia',
      caption:
        'ini photo kucing persia yang sangat langka, jarang orang memilikinya',
      poster_image_url: 'http://www.perdanaphoto/photokucingpersia.png',
      UserId: 1,
      createdAt: '2022-11-09T09:05:51.857Z',
      updatedAt: '2022-11-09T09:21:44.740Z',
      User: {
        id: 1,
        username: 'perdanaph27',
        profile_image_url: 'http://www.profile/myphoto.png',
      },
      Comments: [
        {
          comment: 'Ini comment untuk photo 1 yaitu kucing',
          User: {
            username: 'perdanaph27',
          },
        },
      ],
    },
  ]
}
```

### Edit Photo

- endpoint untuk mengedit data photo sesuai dengan parameter id

| method | endpoint                   | authentication | authorization |
| ------ | -------------------------- | -------------- | ------------- |
| PUT    | /photos/:{params: photoId} | Y              | Y             |

- value yang dikirimkan pada request body

| body (json)      |
| ---------------- |
| poster_image_url |
| title            |
| caption          |

- response json

```js
{
  photos:
  {
    id: 1,
    title: "Kucing persia langka",
    caption: "ini photo kucing persia yang sangat langka, jarang orang memilikinya",
    poster_image_url: "http://www.perdanaphoto/photokucingpersia.png",
    UserId: 1,
    createdAt: "2022-11-09T09:05:51.857Z",
    updatedAt: "2022-11-09T09:21:44.740Z",
  }
}
```

### Delete Photo

- enpoint untuk menghapus data photo sesuai dengan parameter id

| method | endpoint                   | authentication | authorization |
| ------ | -------------------------- | -------------- | ------------- |
| DELETE | /photos/:{params: photoId} | Y              | Y             |

- response json

```js
{
  message: 'Your photo has been successfully deleted';
}
```
