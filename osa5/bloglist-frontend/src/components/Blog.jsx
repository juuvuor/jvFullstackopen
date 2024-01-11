
import React, { useState } from 'react';
import blogService from '../services/blogs'; // replace with your actual import


const Blog = ({ blog, updateLike, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false);
  const [uBlog , uptadeBlogLike] = useState()

  
  
  
  

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike =  () => {
    const updatedBlog = {
      title: blog.title,
      url: blog.url,
      author: blog.author,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    updateLike(updatedBlog, blog.id)
    blog.likes = updatedBlog.likes
    


  
  };


  


  return (
    
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>
        {visible ? 'hide' : 'view'}
      </button>
      {visible && (
        <div>
          <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
          <p>{blog.url}</p>
          <p>{blog.user.name}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;