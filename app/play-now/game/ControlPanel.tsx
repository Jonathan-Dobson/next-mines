import { useReducer } from 'react'
import reducer from './reducer'

function ControlPanel() {
  const [minefield, dispatch] = useReducer(reducer, [])

  function handleReset() {
    console.log('dispatch reset game');
    dispatch({
      type: 'RESET_GAME',
      payload: {
        rows: 10,
        columns: 10,
        mines: 10
      }
    })
  }

  return (
    <div>

      <button onClick={handleReset}>Reset Game</button>
    </div>
  )
}

export default ControlPanel