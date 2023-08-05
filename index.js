import './style.scss'

import React from 'react'
import {createRoot} from 'react-dom/client'

import Wordle from './components/Wordle'

const element = document.getElementById('app')
const root = createRoot(element)
root.render(
    <Wordle />
)
