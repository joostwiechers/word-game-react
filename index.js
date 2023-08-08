import './style.scss'

import React from 'react'
import {createRoot} from 'react-dom/client'

import WordGame from './components/WordGame'

const element = document.getElementById('app')
const root = createRoot(element)
root.render(
    <WordGame />
)
