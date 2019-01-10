import React, {Component} from 'react';
import { connect } from 'react-redux';
import LayerControl from '../layerControl/layerControl'

// import deepEqual from 'deep-equal'

 class ActiveLayers extends Component {
 
  render() {
    const { activeLayers } = this.props
    let ActiveLayersStyle = {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: 5,
    }
    return (
      <div className='active-layer-container' style={ActiveLayersStyle}>
        {
          activeLayers.map(al => <LayerControl key={ al } layerName={ al }/>)
        }
      </div>
    );
  }
}

// ActiveLayers.defaultProps = {
//   isOpen: true
// }

const mapDispatchToProps = {
}

const mapStateToProps = state => {
  return {
    theme: state.map.layers,
    update: state.map.update,
    activeLayers: state.map.activeLayers
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(ActiveLayers)