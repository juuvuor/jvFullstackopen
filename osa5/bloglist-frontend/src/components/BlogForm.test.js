import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('Creating new blog', async () => {
    userEvent.setup()

    // const viewButton = screen.getByText('new blog')
    // await userEvent.click(viewButton)

    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Test Author',
        url: 'http://test.com',
        likes: 5,
        user: {
            name: 'Test User',
            id: '1213432'
        }
    }

    const user =  {
        name: 'Test User',
        id: '1213432'
    }
    
    const createBlog = jest.fn()

    render(
        <BlogForm createBlog={createBlog} user={user} />
    )
    

    const inputTitle = screen.getByPlaceholderText('write title content here')
    const inputAuthor = screen.getByPlaceholderText('write author name here')
    const inputUrl = screen.getByPlaceholderText('write url content here')
    const sendButton = screen.getByText('create')
  
    await userEvent.type(inputTitle, blog.title)
    await userEvent.type(inputAuthor, blog.author)
    await userEvent.type(inputUrl, blog.url)
    await userEvent.click(sendButton)
  
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Component testing is done with react-testing-library')
    expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
    expect(createBlog.mock.calls[0][0].url).toBe('http://test.com')
})