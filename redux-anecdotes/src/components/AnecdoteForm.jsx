import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { createNewAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.content.value
        dispatch(setNotification(`created new anecdote: ${content}`, 10))
        event.target.content.value = ''
       /*  dispatch(addAnecdote(content))
        dispatch(changeNotification(`added anecdote ${content}`))
        setTimeout(() => {
            dispatch(resetNotification())
        }, 5000) */
        dispatch(createNewAnecdote(content))
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