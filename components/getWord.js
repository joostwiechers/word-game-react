import words from '../words'

/**
 * Get a random word for the game.
 * @returns {*|null}
 */
const getWord = (wordLength) => {
    return words[wordLength]?.[Math.floor(Math.random() * words[wordLength]?.length)] || null
}

export default getWord
