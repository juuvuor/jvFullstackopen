const lodash  = require('lodash')

const dummy = () => {
  return 1
}


const totalLikes = (blogsArray)  => {

  return blogsArray.reduce((total, blog) => total + blog.likes, 0)

}

const favoriteBlog = (blogsArray) => {
  if (blogsArray.length === 0) {
    return null    
  }

  let mostLikedBlog = blogsArray[0]

  blogsArray.forEach((blog) => {
    if (blog.likes >= mostLikedBlog.likes) {
      mostLikedBlog = blog
    }
  })

  // console.log('mostLiked' ,mostLikedBlog)

  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes
  }
}


const mostBlogs = (blogsArray) => {
  if (blogsArray.length === 0) {
    return null    
  }

  const authorBlogCounts = lodash.countBy(blogsArray, 'author')
  const authorWithMostBlogs = lodash.maxBy(Object.keys(authorBlogCounts), (author) => authorBlogCounts[author])

  return {
    author: authorWithMostBlogs,
    blogs: authorBlogCounts[authorWithMostBlogs]
  }
}

const mostLikes = (blogsArray) => {
  if (blogsArray.length === 0) {
    return null    
  }

  const authorLikes = lodash(blogsArray)
    .groupBy('author')
    .map((blogs, author) => ({
      author: author,
      likes: lodash.sumBy(blogs, 'likes')
    }))
    .value()

  const authorWithMostLikes = lodash.maxBy(authorLikes, authorLikes.author )

  return {
    author: authorWithMostLikes.author,
    likes: authorWithMostLikes.likes
  }
}

module.exports = {
  dummy,
  totalLikes, 
  favoriteBlog,
  mostBlogs,
  mostLikes
}