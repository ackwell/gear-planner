import React from 'react'
import ReactDOM from 'react-dom'
import {Root} from './Root'
import {configure} from 'mobx'

configure({
	enforceActions: 'observed',
})

ReactDOM.render(<Root />, document.getElementById('root'))
