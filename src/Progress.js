import React from 'react'
import { useQuiz } from './context/QuizContext'

function Progress() {
    // TODO: did'nt understant line 5 which is implement in line 9 for progress bar
    // console.log(Number(answer !== null))
    // console.log(index)
    const { index, numQuestion, points, maxPoints, answer }=useQuiz()
    return (
        <header className='progress'>
            <progress max={numQuestion} value={index + Number(answer !== null)}></progress>
            <p>Question <strong>{index}</strong> / {numQuestion} </p>
            <p><strong>{points} / {maxPoints}</strong></p>
        </header>
    )
}

export default Progress