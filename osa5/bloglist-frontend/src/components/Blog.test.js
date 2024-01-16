import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Test Author',
        url: 'http://test.com',
        likes: 5
    }


    const component = render(

        <Blog blog={blog} />
    )

    // component.debug()

    expect(component.container).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )
    expect(component.container).not.toHaveTextContent(
        'http://test.com'
    )
    expect(component.container).not.toHaveTextContent(
        '5'
    )
})


test('clicking view button shows more content', async () => {
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
    
    const mockHandler = jest.fn()

    render(
        <Blog blog={blog} user={user} toggleVisibility={mockHandler} />
    )

    const button = screen.getByText('view')
    await userEvent.click(button)

    expect(screen.getByText('http://test.com')).toBeInTheDocument()
    expect(screen.getByText(/5/)).toBeInTheDocument()
    expect(screen.getByText('Test User')).toBeInTheDocument()
})

test('cliking like button two time calls event handlet two times', async () => {
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
    
    const mockHandler = jest.fn()

    render(
        <Blog blog={blog} user={user} updateLike={mockHandler}/>
    )

    const viewButton = screen.getByText('view')
    await userEvent.click(viewButton)

    const button = screen.getByText('like')
    await userEvent.click(button)
    await userEvent.click(button)

    expect(mockHandler).toHaveBeenCalledTimes(2)
})

