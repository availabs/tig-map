import React, {Component} from 'react';
import { connect } from 'react-redux';

import LayerHeader from './layerHeader'
import LayerFilterPanel from './layerFilterPanel'

import LegendSelector from "./legendSelector"
import styled from 'styled-components';
import {
  PanelLabel,
  StyledPanelDropdown,
  Button
} from 'components/common/styled-components';

import {
  removeLayer,
  toggleLayerVisibility,
  toggleModal,
  updateDrag
} from '../../store/MapStore'

// import deepEqual from 'deep-equal'

const StyledFilterPanel = styled.div`
  margin-bottom: 12px;
  border-radius: 1px;
  padding-left: 12px;
  padding-right: 12px;
  width: 100%;
`;

const ModalToggle = ({ layer, layerName, toggle }) =>
  <StyledFilterPanel>
    <Button onClick={ toggle } secondary={ true } small={ true } width={ "100%" }>
      { layer.modal.show ? "Hide" : "Show" } Modal
    </Button>
  </StyledFilterPanel>

 class LayerControl extends Component {
  state = {
    showConfig: true
  }

  onDragStart(e, layerName, index) {
    this.props.updateDrag({ dragging: layerName })
  }
  onDragOver(e, index) {
    e.preventDefault()
    this.props.updateDrag({ dragover: index })
  }
  
  render() {
    const { layer, layerName, theme, index } = this.props
    let LayerControlStyle = {
      width: '100%',
      display: 'flex',
      marginBottom: 5,
      backgroundColor: theme.sidePanelHeaderBg
    }
    const { showConfig } = this.state;

    const removeLayer = () => {
      this.props.removeLayer(layerName)
    }

    const toggleConfig = () => {
      this.setState({showConfig: !this.state.showConfig})
    }

    const toggleVisibility = () => {
      this.props.toggleLayerVisibility(layerName)
    }

// console.log('<LayerControl.render>', layer, layer.loading)
    return (
      <div draggable={ true }
        onDragStart={ e => this.onDragStart(e, layerName, index) }
        onDragOver={ e => this.onDragOver(e, index) }>
        <div className='active-layer-container' style={LayerControlStyle}>
          <LayerHeader 
            layerName={layerName}
            onRemoveLayer={removeLayer}
            onToggleVisibility={toggleVisibility}
            isVisible={layer.visible}
            onToggleEnableConfig={toggleConfig}
            loading={ layer.loading }
          />
        </div>
        { !showConfig || !layer.modal || !layer.modal.controlButton ? null :
          <ModalToggle layer={ layer }
            layerName={ layerName }
            toggle={ e => this.props.toggleModal(layerName) }/>
        }
        { !showConfig || !layer.legend || !layer.legend.active ? null :
          <LegendSelector layerName={ layerName }/>
        }
        {showConfig && layer.filters
          ? <LayerFilterPanel layerName={layerName} />
          : ''
        }
      </div>
    );
  }
}

LayerControl.defaultProps = {
  isOpen: true
}

const mapDispatchToProps = {
  removeLayer,
  toggleLayerVisibility,
  toggleModal,
  updateDrag
}

const mapStateToProps = (state,ownProps) => {
  return {
    theme: state.map.theme,
    layer: state.map.layers[ownProps.layerName],
    update: state.map.update
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(LayerControl)