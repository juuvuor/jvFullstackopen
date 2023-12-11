const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Tämän',
    author: 'Takia',
    url: 'On',
    likes: 15,
  },
  {
    title: 'Suuri',
    author: 'saippuakauppias',
    url: 'likaPois',
    likes: 28,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await Blog.findByIdAndDelete(blog._id)

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
