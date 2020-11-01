import React from 'react'
import Square from '../Square/index'
import { v4 as uuid } from 'uuid'
import '../Board/index.css'

function Board({ gridUpdate, grid }) {
    return (
        <div className='board'>
            { grid.map((value, index) => {
                return <Square key={uuid()} value={value} onClick={() => gridUpdate(index)} />
            })}
        </div>
    )
}

export default Board