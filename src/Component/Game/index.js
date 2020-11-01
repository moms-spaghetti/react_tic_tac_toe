import React, { useState, useEffect } from 'react'
import Board from '../Board/index'
import Winner from '../Winner/index'
import History from '../History/index'
import '../Game/index.css'

function Game() {
    const [squaresGrid, setSquaresGrid] = useState(Array(9).fill(null))
    const [squareContents, setSquareContents] = useState(null)
    const [winner, setWinner] = useState(null)
    const [history, setHistory] = useState([])

    function squareHandleClick(value) {
        if (!winner && !squaresGrid[value]) {
            
            setSquaresGrid(
                [
                    ...squaresGrid.slice(0, value),
                    squareContents,
                    ...squaresGrid.slice(++value)
                ])
            
        } else return
    }

    function revertToHistory(index) {
        setSquaresGrid([...history[index].squares])
        setHistory([...history.slice(0, index)])
        setWinner(history[index].winner)
        setSquareContents(history[index].squareContents)
    }

    useEffect(() => {
        setHistory([...history, { squares: [...squaresGrid], winner: winner, squareContents: squareContents }])
        calculateWinner([...squaresGrid])
        swapCounter()
    }, [squaresGrid])

    function swapCounter() {
        if (squareContents === null) {
            setSquareContents('X')
        } else if (squareContents === 'X') {
            setSquareContents('O') 
        } else {
            setSquareContents('X')
        }
    }

    function calculateWinner(grid) {
        if (!winner) {
            const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
            for (let i = 0; i < lines.length; i++) {
                const [a, b, c] = lines[i]
                if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
                    setWinner(`Winner is : ${grid[a]}`)
                    break
                } 
                
                if (grid.every((value) => value !== null)) {
                    setWinner(`It's a draw`)
                }
            }
        }
    }

    return (
        <div>
            <div className="game-container">
                <div>
                    <Board grid={squaresGrid} gridUpdate={squareHandleClick} />
                    <Winner text={winner} />
                </div>
                <div>
                    <History moveData={history} revert={revertToHistory}/>
                </div>
            </div>
        </div>

    )
}

export default Game