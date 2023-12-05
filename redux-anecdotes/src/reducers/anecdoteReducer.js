import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

/* const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
] */

/* const getId = () => (100000 * Math.random()).toFixed(0) */

/* const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

 const initialState = anecdotesAtStart.map(asObject)
 */

const initialState = []

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    increaseVotes(state, action) {
      const id = action.payload
      const anecdoteToUpdate = state.find(note => note.id === id)
      const updatedAnecdote = {...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1}
      return state.map(anecdote => anecdote.id !== id ? anecdote : updatedAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { increaseVotes, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
/* const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case "VOTE": {
      const id = action.data.id
      console.log(id)
      const anecdoteToUpdate = state.find(note => note.id === id)
      const updatedAnecdote = {...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1}
      return state.map(anecdote => anecdote.id !== id ? anecdote : updatedAnecdote)
    }
    case "NEW_ANECDOTE": {
      return [...state, action.data]
    }
    default:
      return state
  }

}

export const increaseVotes = (id) => {
  return {
    type: "VOTE",
    data: { id }
  }
}

export const addAnecdote = (content) => {
  return {
    type: "NEW_ANECDOTE",
    data: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export default anecdoteReducer */