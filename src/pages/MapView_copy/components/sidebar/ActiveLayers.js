import React, {Component} from 'react';
import { connect } from 'react-redux';
import LayerControl from '../layerControl/layerControl'

import {
  dropLayer
} from '../../store/MapStore'

// import deepEqual from 'deep-equal'

 class ActiveLayers extends Component {

  onDragOver(e) {
    e.preventDefault()
  }
  onDrop(e) {
    this.props.dropLayer();
  }
 
  render() {
    const { activeLayers } = this.props
    let ActiveLayersStyle = {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: 5,
    }
    const layers = activeLayers.map((al, i) => <LayerControl key={ al } layerName={ al } index={ i }/>)
    return (
      <div className='active-layer-container' style={ActiveLayersStyle}
        onDragOver={ e => this.onDragOver(e) }
        onDrop={ e=> this.onDrop(e) }>
        {
          layers.reverse()
        }
      </div>
    );
  }
}

// ActiveLayers.defaultProps = {
//   isOpen: true
// }

const mapDispatchToProps = {
  dropLayer
}

const mapStateToProps = state => {
  return {
    theme: state.map.layers,
    update: state.map.update,
    activeLayers: state.map.activeLayers
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(ActiveLayers)