import React, { PropTypes } from 'react'
import createG2 from 'g2-react'
import { Stat } from 'g2'

const Circle = createG2(chart => {
  chart.coord('theta',{
    radius: 1,
    inner: 0.8,
  })
  chart.legend({
    position: 'left',
    title: null,
    dy: -20,
    dx: 30,
  })
  chart.intervalStack().position(Stat.summary.percent('number'))
  .color('status')
  .style({
    lineWidth: 1,
  })
  chart.render()
})

class CircleView extends React.Component {
  config = {
    width: 200,
    height: 350,
    plotCfg: {
      margin: [-90, 24, 10, 24],
      border: {
        stroke: '#ddd',
        lineWidth: 1,
      },
    },
  }
  convertData = (data) => data.map((item) => (
    { ...item, status: `${item.status}           ${item.number}`}
  ))
  getTotalNumber = (data) => {
    let totalNumber = 0
    data.forEach((item) => {
      totalNumber += item.number
    })
    return totalNumber
  }
  render() {
    const { data } = this.props
    const { width, height, plotCfg } = this.config
    return (
      <div className="circle-container">
        <div className="circle-title">
          <p>{data[0].type}</p>
          <p>{this.getTotalNumber(data)}</p>
        </div>
        <Circle
          data={this.convertData(data)}
          width={width}
          height={height}
          plotCfg={plotCfg}
        />
      </div>
    );
  }
}

CircleView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}
export default CircleView
