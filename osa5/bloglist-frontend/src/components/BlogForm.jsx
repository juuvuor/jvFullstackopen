import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'


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
          id='title'
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
          id='author'
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
          id='url'
          type="text"
          value={newUrl}
          name="Url"
          onChange={({ target }) => setNewUrl(target.value)}
          placeholder = 'write url content here'
        />
      </div>
      <button type="submit" id='createBlog' >create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm