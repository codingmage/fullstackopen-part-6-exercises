import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNewAnecdote } from "../requests"
import { useContext } from "react"
import NotificationContext from "./NotificationContext"

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const [notification, dispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createNewAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"])
      console.log(anecdotes)
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote))
      // exercise 6.23 useContext below
      dispatch({type: "NEW", payload: newAnecdote})
      setTimeout(() => {
        dispatch({type: "RESET"})
      }, 5000) 
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
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
