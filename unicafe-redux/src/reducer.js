const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD': {
      const newGood = state.good + 1
      const changedGood = {
        ...state, good: newGood
      }
      return changedGood
    }
    case 'OK': {
      const newOk = state.ok + 1
      const changedOk = {
        ...state, ok: newOk
      }
      return changedOk
    }
    case 'BAD': {
      const newBad= state.bad + 1
      const changedBad = {
        ...state, bad: newBad
      }
      return changedBad
    }
    case 'ZERO': {
      const resetState = {good: 0, ok: 0, bad: 0}
      return resetState
    }
    default: return initialState
  }
  
}

export default counterReducer
