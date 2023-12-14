const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')


const createUser = async () => {
  try {
    await User.deleteMany({})
    const newUser = {
      username: 'Sammakko',
      password: 'Saku',
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    return response.body
  } catch (error) {
    console.error('Error creating user:', error)
    return null
  }
}

const loginUser = async () => {
  try {
    const userToLogIn = {
      username: 'Sammakko',
      password: 'Saku',
    }

    const response = await api
      .post('/api/login')
      .send(userToLogIn)
      .expect(200)

    return response.body.token
  } catch (error) {
    console.error('Error logging in:', error) 
    return null
  }
}

beforeAll(async () => {
  await createUser()
})



beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

describe('About blogs', () => {
  test('all blogs are returned as json ', async () => {
    const aToken = await loginUser()
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${aToken}`) 
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the identifier field of blog posts is named "id"', async () => {
    const aToken = await loginUser()
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${aToken}`)
    const blogToCheck = response.body[0]

    expect(blogToCheck.id).toBeDefined()
  })

  test('a new blog can be added and it is valid', async () => {
    const aToken = await loginUser()
    const newBlog = {
      title: 'Uusi',
      author: 'ihmelllinen',
      url: 'blogi',
      likes: 27,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${aToken}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const blogs = blogsAtEnd.map((n) => n.title)

    expect(blogs).toContainEqual('Uusi')
  })

  test('set likes value to 0 if value is not given', async () => {
    const aToken = await loginUser()

    const newBlog = {
      title: 'Uusi',
      author: 'ihmelllinen',
      url: 'blogi',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${aToken}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const blogs = blogsAtEnd.map((n) => n.likes)

    expect(blogs).toContainEqual(0)
  })

  test('a new blog can not be added if title or url is missing', async () => {
    const aToken = await loginUser()

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
      .set('Authorization', `Bearer ${aToken}`)
      .send(newBlog)
      .send(newBlog2)
      .send(newBlog3)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })




  test('a blog post can be deleted', async () => {
    const aToken = await loginUser()
  
    const newBlog = {
      title: 'Poistettava plogi',
      author: 'Kirjuri',
      url: 'com',
      likes: 25,
    }
  
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${aToken}`)
      .send(newBlog)
      .expect(201)
  
    // tässä haetaan äsken tallennetun plogin tiedot
    const blogToDelete = response.body
    
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${aToken}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  
    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('blog cannot be added without token', async () => {
    const newBlog = {
      title: 'Uusi Otsikko',
      author: 'Test Kirjailija',
      url: 'uusiTesti.testi',
      likes: 5,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })


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
