import React, {Component} from 'react';
import { connect } from 'react-redux';
import LayerControlHeader from './layerControlHeader'


// import deepEqual from 'deep-equal'

 class LayerControl extends Component {
 
  render() {
    const { layer, layerName, theme } = this.props
    console.log('render LayerControl')
    let LayerControlStyle = {
      width: '100%',
      display: 'flex',
      marginBottom: 5,
      backgroundColor: theme.highlightColor
    }
    
    

    return (
      <div className='active-layer-container' style={LayerControlStyle}>
        <LayerControlHeader layerName={layerName} />
      </div>
    );
  }
}

LayerControl.defaultProps = {
  isOpen: true
}

const mapDispatchToProps = {
}

const mapStateToProps = (state,ownProps) => {
  return {
    theme: state.map.theme,
    layer: state.map.layers[ownProps.layerName],
    update: state.map.update
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(LayerControl)