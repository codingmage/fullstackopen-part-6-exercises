import { useDispatch, useSelector } from "react-redux"
import { increaseVotes } from "../reducers/anecdoteReducer"
import { changeNotification, resetNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {

    const anecdotes = useSelector(state => {
        if (state.filter === '') {
            return state.anecdotes
        }
        const onlyAnecdotes = state.anecdotes
        const onlyFilter = state.filter
        const filteredAnecdotes = onlyAnecdotes.filter(anecdote => anecdote.content.includes(onlyFilter))
        return filteredAnecdotes
    })

    const dispatch = useDispatch()
  
    const vote = (id) => {
      dispatch(increaseVotes(id))
      const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
      dispatch(changeNotification(`you voted for ${votedAnecdote.content}`))
      setTimeout(() => {
          dispatch(resetNotification())
      }, 5000)
    }
  
    const orderByVotes = (a, b) => b.votes - a.votes

    return (
        <div>
            {anecdotes.toSorted(orderByVotes).map(anecdote =>
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