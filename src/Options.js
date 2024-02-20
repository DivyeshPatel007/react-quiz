import React from 'react'

function Options({ question, dispatchFn, answer }) {
    const hasAnswered = answer !== null
    return (
        <div className="options">
            {question.options.map((option, index) => (
                <button
                    className={`btn btn-option ${answer == index ? "answer" : ""} ${ hasAnswered ? index == question.correctOption ? "correct" : "wrong" :""}`} onClick={() => dispatchFn({ type: "newAnswer", payload: index })}
                    key={option}
                    disabled={hasAnswered}
                >{option}</button>
            ))}
        </div>
    )
}

export default Options