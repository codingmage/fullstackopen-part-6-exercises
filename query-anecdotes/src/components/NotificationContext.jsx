import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NEW":
        return `anecdote ${action.payload.content} created`
    case "VOTE":
        return `anecdote ${action.payload.content} voted`
    case "RESET":
        return null
    case "SHORT":
        return `Anecdote is too short. It must have at least 5 characters`
    default:
        return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext