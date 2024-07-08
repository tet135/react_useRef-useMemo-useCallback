// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

//підключили класс Post
const { Post } = require('../class/post')

//+++++++++++++++++++++++++++++++

router.post('/post-create', function (req, res) {
  try {
    const { username, text, postId } = req.body

    if (!username || !text) {
      return res.status(400).json({
        message:
          'Потрібно передати всі дані для створення поста',
      })
    }

    let post = null

    console.log('postId', postId) //return null???!!
    console.log('text', text) //ok
    console.log('username', username) //ok

    if (postId) {
      post = Post.getById(Number(postId))
      console.log('post', post)

      if (!post) {
        return res.status(400).json({
          message: 'Пост з таким ID не існує',
        })
      }
    }

    const newPost = Post.create(username, text, post)

    return res.status(200).json({
      //ці дані взагалі у нас не використовуються
      post: {
        id: newPost.id,
        text: newPost.text,
        username: newPost.username,
        date: newPost.date,
      },
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message, //'PostId problem' у мене oце виводиться!!!!
    })
  }
})

//+++++++++++++++++++++++++++++++

router.get('/post-list', function (req, res) {
  try {
    const list = Post.getList()

    if (list.length === 0) {
      return res.status(200).json({
        list: [],
      })
    }

    return res.status(200).json({
      //map для того,щоб повернути на фронтенд частину тільки потрібні дані, бо можуть бути зайві і непотрібні дані
      list: list.map(({ id, username, text, date }) => ({
        id,
        text,
        username,
        date,
      })),
    })
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    })
  }
})

//+++++++++++++++++++++++++++++++
router.get('/post-item', function (req, res) {
  try {
    const { id } = req.query

    if (!id) {
      return res.status(400).json({
        message: 'Потрібно передати ID поста',
      })
    }

    const post = Post.getById(Number(id))

    if (!post) {
      return res.status(400).json({
        message: 'Пост з таким ID не існує',
      })
    }

    return res.status(200).json({
      //map для того,щоб повернути на фронтенд частину тільки потрібні дані, бо можуть бути зайві і непотрібні дані
      post: {
        id: post.id,
        text: post.text,
        username: post.username,
        date: post.date,

        reply: post.reply.map((item) => ({
          id: item.id,
          text: item.text,
          username: item.username,
          date: item.date,
        })),
      },
    })
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    })
  }
})

// Експортуємо глобальний роутер
module.exports = router
