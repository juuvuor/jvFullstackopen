import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'




const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogVisible, setBlogVisible] = useState(false)
  const blogFormRef = useRef()
  const [updateBlogs, setUpdateBlogs] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      console.log('päästäänkö tähän')
      setErrorMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage('Adding new blog failed. Fill all boxes')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  };
  

  const blogForm = () => {
    return (
      <Togglable buttonLabel = 'new blog' ref={blogFormRef}>
        <h2>Create new</h2>
        <BlogForm
          createBlog={addBlog}
          user = {user}
        />
    </Togglable>
    )
  }
  
  const updateLike = async (blog, id) => {
		try {
			await blogService.addLike(blog, id)
      console.log('1')
			setUpdateBlogs(!updateBlogs)
      console.log('2')
			setErrorMessage(["Successfully liked blog", true])
			setTimeout(() => {
        setErrorMessage(null)
			}, 5000)
		} catch (error) {
			setErrorMessage(["like not added", false])
			setTimeout(() => {
        setErrorMessage(null)
			}, 5000)
			console.error("error liking a blog", error)
		}
	}

 

    return (
    <div>
      {user === null ?
        <div>
          <h1>log in to application</h1>
          <Notification message={errorMessage} />
          <LoginForm
              username = {username}
              setUsername = {setUsername}
              password = {password}
              setPassword = {setPassword}
              handleLogin = {handleLogin}
              />
        </div> :
        <div>
          <h1>Blogs</h1>
          <Notification message={errorMessage} />
          <p>{user.name} logged in <button onClick={logout}>logout</button></p>
         
          {blogForm()}
          {/* {blogs.filter(blog => blog.user.username === user.username).map(blog =>
          <Blog 
            key={blog.id}
            blog={blog}
            setBlogs={setBlogs}
            />
          )} */}
          {blogs.filter(blog => blog.user.username === user.username).map(blog => (
				<Blog
					key={blog.id}
					blog={blog}
					updateLike={updateLike}
					// removeBlog={removeBlog}
					user={user}
				/>))}
        </div>
      }
    </div>
    )
}

export default App