import React from 'react'
import Options from './Options'

function Question({ question ,dispatchFn,answer}) {
    return (
        <div>
            <h4>
                {question.question}
            </h4>
            <Options question={question} dispatchFn={dispatchFn} answer={answer} />
        </div>
    )
}

export default Question