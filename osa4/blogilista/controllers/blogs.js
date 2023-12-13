const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})



blogsRouter.post('/', async (request, response) => {
  const body = request.body
  console.log('tullaanko tänne asti 1')
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  console.log('tullaanko tänne asti2')
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  
  const user = await User.findById(decodedToken.id)

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'content missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: body.likes || 0,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  // response.status(201).json(savedBlog)
  response.json(savedBlog)
})



blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter
