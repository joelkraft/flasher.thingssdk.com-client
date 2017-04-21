import React from 'react'

// Components
import Dashboard from './Dashboard'

import '../App.css'

const App = props => {
    return <Dashboard match={props.match} />
}

export default App