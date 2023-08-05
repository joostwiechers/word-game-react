import React, {useMemo} from 'react'

const Keyboard = ({word, attempts}) => {
    // Define keys on the keyboard.
    const keyboardKeys = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    ]

    // Get all used keys in the attempts and make the array unique.
    const attemptKeys = useMemo(() => {
        return [...new Set(attempts.map(attempt => attempt.split('')).flat())]
    }, [attempts])

    const getKeyColor = key => {

        if (!attemptKeys.includes(key)) {
            return
        }

        // Check for exact match.
        for (let a = 0; a < attempts.length; a++) {
            for (let i = 0; i < word.length; i++) {
                if (attempts?.[a]?.[i] === key && word?.[i] === attempts?.[a]?.[i]) {
                    return 'keyboard__key--correct'
                }
            }
        }

        if (word.includes(key)) {
            return 'keyboard__key--misplaced'
        }

        return 'keyboard__key--incorrect'
    }

    return (
        <div className="keyboard">
            {keyboardKeys.map((row, index) =>
                <div className="keyboard__row" key={index}>
                    {row.map(key =>
                        <div key={key} className={['keyboard__key', getKeyColor(key)].join(' ')}>{key}</div>
                    )}
                </div>
            )}
        </div>
    )

}

export default Keyboard
