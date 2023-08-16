import React, {useEffect, useState} from 'react'

import WordGrid from './WordGrid'
import Keyboard from './Keyboard'
import getWord from './getWord'

/**
 *
 * @param maxAttempts - The amount attempts the user can exhaust before losing the game.
 * @param wordLength - The length of the word to be guessed.
 * @returns {JSX.Element}
 * @constructor
 */
const WordGame = ({maxAttempts = 6, wordLength = 5}) => {

    // Get random word.
    const [word, setWord] = useState(null)

    // Keep game status.
    const [wordGuessed, setWordGuessed] = useState(false)
    const [exhaustedAttempts, setExhaustedAttempts] = useState(false)

    // Record the attempts and the current attempt.
    const [currentAttempt, setCurrentAttempt] = useState('')
    const [attempts, setAttempts] = useState([])

    // Update game status on guess.
    useEffect(() => {
        setWordGuessed(attempts.includes(word))
        setExhaustedAttempts(attempts.length === maxAttempts)
    }, [attempts])

    // Give the cheater some help.
    useEffect(() => {
        word && console.log(`Cheater! The word is ${word}`)
    }, [word])

    useEffect(() => {
        reset()
    }, [wordLength])

    const checkAttempt = e => {
        e.preventDefault()

        // Attempt length should be same as word length.
        if (currentAttempt.length !== wordLength) {
            return
        }

        // The word should not be guessed already.
        if (attempts.includes(currentAttempt)) {
            return
        }

        // Add to attempts, then reset the value.
        setAttempts([...attempts, currentAttempt])
        setCurrentAttempt('')
    }

    /**
     * Reset all data.
     */
    const reset = () => {
        setWordGuessed(false)
        setExhaustedAttempts(false)
        setCurrentAttempt('')
        setAttempts([])
        setWord(getWord(wordLength))
    }

    if (!word) {
        return <div>Could not get word for this length.</div>
    }

    return (
        <>
            <form className="wordle" onSubmit={checkAttempt}>

                <WordGrid word={word} maxAttempts={maxAttempts} attempts={attempts} currentAttempt={currentAttempt} />

                {!wordGuessed && !exhaustedAttempts &&
                    <input type="text"
                           value={currentAttempt}
                           autoFocus
                           maxLength={wordLength}
                           onChange={e => e.target.value.length <= wordLength && setCurrentAttempt(e.target.value)} />
                }

                <Keyboard attempts={attempts} word={word} setCurrentAttempt={setCurrentAttempt}
                          currentAttempt={currentAttempt} />

                {exhaustedAttempts && !wordGuessed &&
                    <div className="notification notification--error">You failed to guess the word! ({word})</div>
                }

                {wordGuessed &&
                    <div className="notification notification--success">You guessed the word!</div>
                }
            </form>

            <button onClick={reset}>Restart</button>
        </>
    )
}

export default WordGame
