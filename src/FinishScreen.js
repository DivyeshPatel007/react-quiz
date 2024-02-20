import React from 'react'
function FinishScreen({ points,maxPossiblePoints,dispatchFn }) {
    const percentage = (points / maxPossiblePoints) * 100
    return (
        <>
        <p className='result'>
            You scoreed <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%).
        </p>
       <button className='btn btn-ui' onClick={()=>dispatchFn({type:"reset"})}>Reset Quiz</button> 
        
        </>
    )
}

export default FinishScreen