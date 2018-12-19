import React, {Component} from 'react';
import { connect } from 'react-redux';

// import deepEqual from 'deep-equal'
// import LegendHeader from './LegendHeader'
// import SelectedDataPane from './SelectedDataPane'
// import EpochSlider from '../slider/epochSlider'

import * as d3scale from "d3-scale"

 class Legend extends Component {

  getScale() {
    switch (this.props.type) {
      case "linear":
        return d3scale.scaleLinear();
      case "ordinal":
        return d3scale.scaleOrdinal();
      case "quantile":
        return d3scale.scaleQuantile();
      case "quantize":
        return d3scale.scaleQuantize();
    }
  }
  
  render() {
    const { theme, domain, range } = this.props

    const scale = this.getScale()
      .domain(this.props.domain)
      .range(this.props.range)

    let legendContainerStyle = {
      width: '100%',
      display: 'flex',
      color: theme.textColor 
    }

    let colorBlock = {
      alignItems: 'stretch',
      flexGrow: 1,
      height: 20
    }

    let textBlock = {
      width: (100 / (this.props.type === 'linear' ? scale.ticks(5).length : this.props.range.length)) + '%',
      color: theme.textColor,
      display: 'inline-block',
      textAlign: 'right',
    }

    return (
      <div style={{width: '100%',  padding: 10, backgroundColor: theme.sidePanelHeaderBg}}>
        <h5 style={{color: theme.textColor }}>{this.props.title}</h5>
        <div className='legend-container' style={legendContainerStyle}>
          {
            this.props.type === "linear" ?
              scale.ticks(5).map(t => <div key={ t } style={ { ...colorBlock , backgroundColor: scale(t) } }/>)
            :
              range.map(r => <div key={ r } style={ { ...colorBlock, backgroundColor: r } }/>)
          }
        </div>
        <div style={{width:'100%', position: 'relative', right: -3}}>
          { 
            this.props.type === "ordinal" ?
              domain.map(d => <div key={ d } style={ textBlock } >{ d }</div>)
            : this.props.type === "linear" ?
              scale.ticks(5).map(t => <div key={ t } style={ textBlock }>{ t }</div>)
            :
              range.map(r => <div key={ r } style={ textBlock }>{ this.props.format(scale.invertExtent(r)[1]) }</div>)
          }
          <div style={ textBlock }></div>
        </div>
      </div>
    );
  }
}

Legend.defaultProps = {
  title: 'Legend',
  range: [],
  domain: [],
  type: "linear",
  format: d => d
}

export default Legend