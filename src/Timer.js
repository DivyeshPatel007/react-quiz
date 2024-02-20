import React, { useEffect } from 'react'
import { useQuiz } from './context/QuizContext';

function Timer() {
  const {dispatchFn,remainingSecond}=useQuiz()
    const minute = Math.floor(remainingSecond/60);
    const second = remainingSecond % 60;
    
    useEffect(()=>{
       const timer =  setInterval(()=>{
            dispatchFn({type:"tick"})
        },1000)

        return ()=>{
            clearInterval(timer)
        }
    },[])
  return (
    <div className='timer'>{minute<10?"0":''}{minute}:{second<10?"0":''}{second}</div>
  )
}

export default Timer