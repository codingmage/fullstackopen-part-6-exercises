import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import { getAll } from './requests'

const App = () => {

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
    retry: 1
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <span>...Loading data</span>
  }

  if (result.isError) {
    return <span>Anecdote service unavailable due to problems in the server</span>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    console.log('vote')
  }



  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
