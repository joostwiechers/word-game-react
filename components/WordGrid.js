import React from 'react'

const WordGrid = ({maxAttempts, word, attempts, currentAttempt}) => {

    const renderWord = (attempt, row) => {
        const letters = []

        // Loop over the word's letters.
        for (let i = 0; i < word.length; i++) {
            let letter = attempt?.[i]
            let classes = ['word-grid__letter']

            // Letter is correct.
            if (word?.[i] === letter) {
                classes.push('word-grid__letter--correct')
            }

            // Letter is somewhere else in the word.
            if (word.includes(letter) && word?.[i] !== letter) {
                classes.push('word-grid__letter--misplaced')
            }

            // Letter does not exist in the word.
            if (letter && !word.includes(letter)) {
                classes.push('word-grid__letter--incorrect')
            }

            // If first empty row, show current attempt.
            if (!letter && row === attempts.length) {
                letter = currentAttempt[i]
            }

            letters.push(<div key={i} className={classes.join(' ')}>{letter}</div>)
        }

        return letters
    }

    // Loop over the maximum attempts and create a row for it.
    const grid = []
    for (let i = 0; i < maxAttempts; i++) {
        grid.push(
            <div className="word-grid__word" key={i}>
                {renderWord(attempts[i], i)}
            </div>
        )
    }

    return (
        <div className="word-grid">
            {grid}
        </div>
    )
}

export default WordGrid
