import React, {Component} from 'react';
import { connect } from 'react-redux';

import { activateLayer } from '../../store/MapStore'
// import deepEqual from 'deep-equal'

 class LayerSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.closeDropdown = this.closeDropdown.bind(this)
    this.addLayer = this.addLayer.bind(this)
  }

  toggleDropdown () { this.setState({ open: !this.state.open }) }

  closeDropdown () { this.setState({ open: false }) }

  addLayer (e) {
    // console.log('add layer', e.target.getAttribute('value'))
    this.props.activateLayer(e.target.getAttribute('value'))
    this.closeDropdown()
  }

  render() {
    const { theme, layers } = this.props
    let LayerSelectorStyle = {
      width: '100%',
      display: 'flex',
      padding: 5,
    }
    console.log('render rlist', Object.keys(layers).filter(d => layers[d].active).map(d => layers[d].name))

    return (
      <div className='sidebar-header' style={LayerSelectorStyle}>
       
        
      </div>
    );
  }
}

// LayerSelector.defaultProps = {
//   isOpen: true
// }

const mapDispatchToProps = {
  activateLayer
}

const mapStateToProps = state => {
  return {
    theme: state.map.theme,
    layers: state.map.layers
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(LayerSelector)