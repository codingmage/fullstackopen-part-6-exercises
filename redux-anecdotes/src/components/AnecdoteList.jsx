import { useDispatch, useSelector } from "react-redux"
import { increaseVotes } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()
  
    const vote = (id) => {
      dispatch(increaseVotes(id))
    }
  
    const orderByVotes = (a, b) => b.votes - a.votes

    return (
        <div>
            {anecdotes.sort(orderByVotes).map(anecdote =>
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