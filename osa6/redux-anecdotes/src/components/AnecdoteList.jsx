import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {


  const anecdotes = useSelector((state) => {
    console.log('state1: ', state.anecdote)
      if (state.filter.length <= 0) {
        return state.anecdote
      }
      return state.anecdote.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      );
    });

    const dispatch = useDispatch();



    const vote = (id) => {
        dispatch(voteAnecdote(id))
      }
    

return (
    <div>
      {anecdotes
      .slice()
      .sort((a, b) => b.votes - a.votes)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div> 
)
    
}
export default AnecdoteList

