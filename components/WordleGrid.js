import React from 'react'

const WordleGrid = ({maxAttempts, word, attempts}) => {

    const renderWord = (attempt) => {
        const letters = []
        // Loop over the word's letters.
        for (let i = 0; i < word.length; i++) {
            const letter = attempt?.[i]
            let classes = ['cell']

            // Letter is correct.
            if (word?.[i] === letter) {
                classes.push('cell--correct')
            }

            // Letter is somewhere else in the word.
            if (word.includes(letter) && word?.[i] !== letter) {
                classes.push('cell--misplaced')
            }

            // Letter does not exist in the word.
            if (letter && !word.includes(letter)) {
                classes.push('cell--incorrect')
            }

            letters.push(<div key={i} className={classes.join(' ')}>{letter}</div>)
        }
        return letters
    }

    // Loop over the maximum attempts and create a row for it.
    const grid = []
    for (let i = 0; i < maxAttempts; i++) {
        grid.push(
            <div className="row" key={i}>
                {renderWord(attempts[i])}
            </div>
        )
    }

    return (
        <div className="wordle__grid">
            {grid}
        </div>
    )
}

export default WordleGrid
