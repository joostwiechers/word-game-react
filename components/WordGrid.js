import React from 'react'
import Word from './Word'

/**
 * Generate the grid of the words that have been guessed and the attempts that the user still has available.
 *
 * @param maxAttempts
 * @param word
 * @param attempts
 * @param currentAttempt
 * @returns {JSX.Element}
 * @constructor
 */
const WordGrid = ({maxAttempts, word, attempts, currentAttempt}) => {

    // Loop over the maximum attempts and create a row for it.
    const grid = []
    for (let i = 0; i < maxAttempts; i++) {
        grid.push(
            <Word key={i} word={word} attempts={attempts} row={i} currentAttempt={currentAttempt} />
        )
    }

    return (
        <div className="word-grid">
            {grid}
        </div>
    )
}

export default WordGrid
