import React, {useEffect, useState} from 'react'

// Import the words.
import words from '../words'
import WordleGrid from './WordleGrid'
import Keyboard from './Keyboard'

const Wordle = ({maxAttempts = 6, wordLength = 5}) => {

    // Get random word.
    const [word] = useState(words[wordLength]?.[Math.floor(Math.random() * words[wordLength]?.length)] || null)

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
        console.log(`Cheater! The word is ${word}`)
    }, [word])

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

        setAttempts([...attempts, currentAttempt])

        setCurrentAttempt('')
    }

    if (!word) {
        return <div>Something went wrong.</div>
    }

    return (
        <form className="wordle" onSubmit={checkAttempt}>
            <h1>Wordle</h1>

            {exhaustedAttempts && !wordGuessed &&
                <div className="notification notification--error">You failed to guess the word! ({word})</div>
            }

            {wordGuessed && <div className="notification notification--success">You guessed the word!</div>}

            <WordleGrid word={word} maxAttempts={maxAttempts} attempts={attempts} />

            {!wordGuessed && !exhaustedAttempts &&
                <input type="text"
                       value={currentAttempt}
                       autoFocus
                       onChange={e => setCurrentAttempt(e.target.value)} />
            }

            <Keyboard attempts={attempts} word={word} />
        </form>
    )
}

export default Wordle
