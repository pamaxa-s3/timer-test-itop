import React, { useState, useEffect } from 'react';
import './App.css'
import { Button } from './components/UI/Button/Button';

const App = () => {

  const [timerOn, setTimerOn] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)

  // =======================Запускаем таймер=================================
  useEffect(() => {
    let interval = null

    if (timerOn) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [timerOn])

  if (seconds > 59) {
    setMinutes(prevMinutes => prevMinutes + 1)
    setSeconds(0)
  }

  if (minutes > 59) {
    setHours(prevHours => prevHours + 1)
    setMinutes(0)
  }

  // =======================Обрабатываем двойной клик=================================

  let lastClicked = 0

  const DoubleClickHandler = () => {
    let timeNow = new Date().getTime()

    if (timeNow < (lastClicked + 3000)) {
      setTimerOn(false)
    }
    lastClicked = timeNow
  }
  // =======================Отрисовка страницы=================================
  return (
    <div className='App'>
      <div className='App_timerViewer'>
        <div>
          {
            hours < 10
              ? ('0' + hours)
              : hours
          }
        </div> :
        <div>
          {
            minutes < 10
              ? ('0' + minutes)
              : minutes
          }
        </div> :
        <div>
          {
            seconds < 10
              ? ('0' + seconds)
              : seconds
          }
        </div>
      </div>
      <div>
        <Button
          type='success'
          onClick={() => setTimerOn(true)}
          disabled={timerOn}
        >
          Start
        </Button>
        <Button
          type='error'
          onClick={() => setTimerOn(false)}
          disabled={!timerOn}
        >
          Stop
        </Button>
        <Button
          type='primary'
          onClick={DoubleClickHandler}
          disabled={!timerOn}
        >
          Wait
        </Button>
        <Button
          type='error'
          onClick={() => setSeconds(0)}
          disabled={timerOn || !seconds}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

export default App;