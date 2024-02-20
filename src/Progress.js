import React from 'react'

function Progress({ index, numQuestion, points, maxPoints, answer }) {
    // TODO: did'nt understant line 5 which is implement in line 9 for progress bar
    // console.log(Number(answer !== null))
    // console.log(index)
    return (
        <header className='progress'>
            <progress max={numQuestion} value={index + Number(answer !== null)}></progress>
            <p>Question <strong>{index}</strong> / {numQuestion} </p>
            <p><strong>{points} / {maxPoints}</strong></p>
        </header>
    )
}

export default Progress