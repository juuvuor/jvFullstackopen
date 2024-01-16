import React from 'react'
import { useState } from 'react'


const BlogForm = ({ createBlog , user }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog ({
      user: user,
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')


  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          value={newTitle}
          name="Title"
          onChange={({ target }) => setNewTitle(target.value)}
          placeholder = 'write title content here'
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={newAuthor}
          name="Author"
          onChange={({ target }) => setNewAuthor(target.value)}
          placeholder = 'write author name here'
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={newUrl}
          name="Url"
          onChange={({ target }) => setNewUrl(target.value)}
          placeholder = 'write url content here'
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm