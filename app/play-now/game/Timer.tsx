'use client'
import { useEffect, useState } from 'react'

function Timer({ state }) {
  const [time, setTime] = useState(0)

  useEffect(() => { }, [state.endTime])

  useEffect(() => {
    if (state.endTime > 0) {
      setTime(state.endTime - state.startTime)
      return
    }
    if (state.gameStatus === 'on' && state.startTime === 0) {
      setTime(0)
    }
    const interval = setInterval(() => {
      if (state.gameStatus === 'on' && state.startTime > 0) {
        setTime(Date.now() - state.startTime)
      }

    }, 1000)
    return () => clearInterval(interval)
  }, [state.startTime, state.gameStatus, state.endTime])

  if (state.endTime > 0) {
    return (
      <div>{
        ((state.endTime - state.startTime) / 1000).toFixed(0)
      }</div>
    )
  }
  if (state.gameStatus === 'off') return (<div>0</div>)
  if (state.gameStatus === 'lost') return (<div>((state.endTime - state.startTime) / 1000).toFixed(0)</div>)

  return (
    <div>{
      (time / 1000).toFixed(0)
    }</div>
  )
}

export default Timer