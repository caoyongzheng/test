import React from 'react'
import ReactDOM from 'react-dom'
import createG2 from 'g2-react'
import { Stat } from 'g2'
import './index.css'
import data from './data.json'

const Circle = createG2(chart => {
  chart.coord('theta',{
    radius: 1,
    inner: 0.6,
  })
  chart.intervalStack().position(Stat.summary.percent('number'))
  .color('status')
  .style({
    lineWidth: 1,
  })
  chart.render()
})

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: data,
      width: 200,
      height: 400,
      plotCfg: {
        margin: [10, 10, 10, 10],
        border: {
          stroke: '#ddd',
          lineWidth: 1,
        },
      },
    }
  }

  render() {
    return (
      <div className="circle-container">
        <div className="circle-title">{123}</div>
        <Circle
          data={this.state.data}
          width={this.state.width}
          height={this.state.height}
          plotCfg={this.state.plotCfg}
          ref={(myChart) => (this.myChart = myChart)}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
