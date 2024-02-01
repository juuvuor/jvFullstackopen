import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    const object = {content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
  }

const voteAnecdote = async (action) => {
  const anecdote = await axios.get(`${baseUrl}/${action}`)
	
	const changedAnecdote = {
		...anecdote.data,
		votes: anecdote.data.votes + 1
	}
	
  const request = axios.put(`${baseUrl}/${action}`, changedAnecdote)
  
	return (await request).data
}
  

export default { getAll, createNew, voteAnecdote }