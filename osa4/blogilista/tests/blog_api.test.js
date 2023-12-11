const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('all blogs are returned as json ', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the identifier field of blog posts is named "id"', async () => {
  const response = await api.get('/api/blogs')
  const blogToCheck = response.body[0]

  expect(blogToCheck.id).toBeDefined()
})

test('a new blog can be added and it is valid', async () => {
  const newBlog = {
    title: 'Uusi',
    author: 'ihmelllinen',
    url: 'blogi',
    likes: 27,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const blogs = blogsAtEnd.map((n) => n.title)

  expect(blogs).toContainEqual('Uusi')
})

test('set likes value to 0 if value is not given', async () => {
  const newBlog = {
    title: 'Uusi',
    author: 'ihmelllinen',
    url: 'blogi',
    likes: null,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const blogs = blogsAtEnd.map((n) => n.likes)

  expect(blogs).toContainEqual(0)
})

test('a new blog can not be added if title or url is missing', async () => {
  const newBlog = {
    title: '',
    author: 'ihmelllinen',
    url: 'blogi',
    likes: 27,
  }

  const newBlog2 = {
    title: 'otsikkoOn',
    author: 'ihmelllinen',
    url: '',
    likes: 27,
  }

  const newBlog3 = {
    title: '',
    author: 'MolemmatPuuttuu',
    url: '',
    likes: 3,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .send(newBlog2)
    .send(newBlog3)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})




test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  
  const blogsAtEnd = await helper.blogsInDb()
  
  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )
  
  const titles = blogsAtEnd.map(r => r.title)
  
  expect(titles).not.toContain(blogToDelete.title)
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

describe('Test of creating new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('Create user whit out username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: '',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400) 

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length )

  })
  test('Create user whit out passwor', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'SamiVal',
      name: 'Sami Valimaki',
      password: '',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length )

  })
})



afterAll(async () => {
  await mongoose.connection.close()
})
