import React from 'react'
import { v4 as uuid } from 'uuid'
import '../History/index.css'

function History({moveData, revert}) {
    return (
        <div className="history-button-container">
            {moveData.map((value, index) => {
                return <button className="history-button" key={uuid()} onClick={() => {revert(index)}}>{`Go to move: ${index} (${value.squareContents === null ? 'Next move is X' : value.squareContents})`}</button>
            })}
        </div>
    )
}

export default History