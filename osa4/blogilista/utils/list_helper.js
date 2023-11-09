
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

module.exports = {
  dummy,
  totalLikes, 
  favoriteBlog
}