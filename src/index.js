import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import data from './data.json'

import CircleView from './CircleView'

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <CircleView data={data.Rzone} />
        <CircleView data={data.Gzone} />
        <CircleView data={data.Czone} />
        <CircleView data={data.Other} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
