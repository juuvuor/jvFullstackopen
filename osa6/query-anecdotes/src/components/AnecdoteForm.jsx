import { useQuery, useMutation , useQueryClient} from '@tanstack/react-query'
import { getAnecdotes, createAnecdote } from '../requests'
import { useNotificationDispatch } from '../notificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispath = useNotificationDispatch()

  const newAnecMutation = useMutation({
    mutationFn: createAnecdote,
    onError:() => {
      notificationDispath({ type: 'SET_NOTIFICATION' , notification: 'too short anecdote, must have length 5 or more'})

    setTimeout(() => {
      notificationDispath({ type: 'CLEAR_NOTIFICATION' , notification: null})
    }, 5000)
    },
    onSuccess:() => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    },
    
  })

  const onCreate = (event) => {
    
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecMutation.mutate({ content, votes: 0})

    notificationDispath({ type: 'SET_NOTIFICATION' , notification: `You created anecdote '${content}'`})

    setTimeout(() => {
      notificationDispath({ type: 'CLEAR_NOTIFICATION' , notification: null})
    }, 5000)
    
}




  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
