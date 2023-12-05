import { useDispatch } from "react-redux"
import { createNewAnecdote } from "../reducers/anecdoteReducer"
import { changeNotification, resetNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.content.value
       /*  dispatch(addAnecdote(content)) */
        dispatch(changeNotification(`added anecdote ${content}`))
        setTimeout(() => {
            dispatch(resetNotification())
        }, 5000)
        dispatch(createNewAnecdote(content))
        event.target.content.value = ''
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={newAnecdote}>
                <div><input name='content'/></div>
                <button type='submit'>create</button>
            </form>
        </div>

    )

}

export default AnecdoteForm