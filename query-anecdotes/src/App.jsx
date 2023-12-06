import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, updateAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (responseAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const liveAnecdotes = anecdotes.map(anecdote => anecdote.id === responseAnecdote.id ? responseAnecdote : anecdote)
      queryClient.setQueryData(['anecdotes'], liveAnecdotes)
      /* queryClient.invalidateQueries({ queryKey: ['anecdotes'] }) */
    },
  })

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
    refetchOnWindowFocus: false,
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
/*     const newVoteCount = anecdote.votes + 1 */
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
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
