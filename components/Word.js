import React from 'react'

/**
 * Makes up for an attempt in the word grid.
 *
 * @param word
 * @param attempts
 * @param row
 * @param currentAttempt
 * @returns {JSX.Element}
 * @constructor
 */
const Word = ({word, attempts, row, currentAttempt}) => {

    /**
     * Returns the class for the letter depending on its position.
     * @param letter
     * @param letterPosition
     * @returns {string}
     */
    const getLetterColor = (letter, letterPosition) => {
        if (!letter) {
            return ''
        }

        // Letter is correct.
        if (word?.[letterPosition] === letter) {
            return 'word-grid__letter--correct'
        }

        // Letter is somewhere else in the word. Should not be yellow if it's green somewhere else.
        if (word.includes(letter) && word?.[letterPosition] !== letter) {

            // Get the index(es) where the letter is at and filter out nulls.
            const letterIndexes = Array.from(word).map((wordLetter, index) => {
                return wordLetter === letter ? index : null
            }).filter(x => x !== null)

            // Check how much of the same letter are correct.
            const correctLetters = letterIndexes.filter(index => word[index] === attempts[row][index])

            // The word contains the letter, but they have been filled in correctly already. This should be gray.
            if (letterIndexes.length - correctLetters.length === 0) {
                return 'word-grid__letter--incorrect'
            }

            // Letter in word, but also not filled in correct spot.
            return 'word-grid__letter--misplaced'
        }

        // Letter does not exist in the word.
        if (letter && !word.includes(letter)) {
            return 'word-grid__letter--incorrect'
        }
    }

    const renderWord = () => {
        const letters = []

        for (let i = 0; i < word.length; i++) {
            let letter = attempts?.[row]?.[i]

            // Get color before changing it to the current attempt.
            const letterColor = getLetterColor(letter, i)

            // If first empty row, show current attempt.
            if (!letter && row === attempts.length) {
                letter = currentAttempt?.[i]
            }

            letters.push(
                <span key={i} className={`word-grid__letter ${letterColor}`}>{letter}</span>
            )
        }

        return letters
    }

    return (
        <div className="word-grid__word">
            {renderWord()}
        </div>
    )

}

export default Word
