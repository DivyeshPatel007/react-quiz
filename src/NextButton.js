import React from 'react'

function NextButton({ dispatchFn, answer, index, numQuestion }) {
    if (answer === null)
        return null

    if (index < numQuestion - 1) {
        return (
            <button className='btn btn-ui' onClick={() => dispatchFn({ type: "nextQuestion" })}>Next</button>
        )
    }
    if (index === numQuestion - 1) {
        return (
            <button className='btn btn-ui' onClick={() => dispatchFn({ type: "finish" })}>Finish</button>
        )
    }
}

export default NextButton