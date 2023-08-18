/**
 * Returns if the word is valid or not, depending on the status code.
 * @param word
 * @returns {Promise<boolean>}
 */
function validateWord(word) {
    return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(result => result.status === 200)
}

export default validateWord
