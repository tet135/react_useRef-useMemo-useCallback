class Post {
  static #list = []
  static #count = 1

  constructor(username, text) {
    this.id = Post.#count++
    this.username = username
    this.text = text
    //тут будуть мілісекунди, які на фроненді ми перетворимо на зрозумілу дату
    this.date = new Date().getTime()

    this.reply = []
  }

  //метод create створює і сам пост, і відповідь на пост (тобто reply)
  //post - необов'язковий параметр, це reply на пост. Буде використаний тоді, коли це для reply
  //Тоді можно через один ендпоїнт та один контейнер створювати і пост, і reply.
  static create(username, text, post) {
    const newPost = new Post(username, text)

    if (post) {
      post.reply.push(newPost)

      console.log('post', post)
    } else {
      this.#list.push(newPost)
    }

    console.log('list', this.#list)

    return newPost
  }

  static getById(id) {
    return (
      this.#list.find((item) => item.id === Number(id)) ||
      null
    )
  }

  static getList = () => this.#list
}

module.exports = {
  Post,
}
