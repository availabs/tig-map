import React, {Component} from 'react';
import { connect } from 'react-redux';

// import deepEqual from 'deep-equal'
import SidebarHeader from './SidebarHeader'
import LayerSelector from './LayerSelector'
import ActiveLayers from './ActiveLayers'
import LayerList from './LayerList'

class Sidebar extends Component {
  
  render() {
    const { theme } = this.props
    let sideBarContainerStyle = {
      width: this.props.isOpen ? 300: 0,
      zIndex: 99,
      height: '100%',
      display: 'flex',
      transition: 'width 250ms',
      position: 'absolute',
      top: 0,
      left: 0,
      padding: 20,
      paddingBottom: 30
    }

    let sidebarStyle = {
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
      transition: 'left 250ms, right 250ms',
      alignItems: 'stretch',
      flexGrow: 1
    }

    let sidebarInnerStyle = {
      backgroundColor: theme.backgroundColor,//'#293145', //#242730
      borderRadius: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }

    let sidebarContentStyle = {
      flexGrow: 1,
      padding: 0,
      overflowY: 'auto',
      overflowX: 'hidden'
    }
    console.log('render sidebar', this.props)

    return (
      <div className='sidebar-container' style={sideBarContainerStyle}>
        <div className='sidebar' style={sidebarStyle}>
          <div className='sidebar-inner' style={sidebarInnerStyle}>
            <SidebarHeader />
            <div className='sidebar-content' style={sidebarContentStyle}>
              <LayerSelector />
              <ActiveLayers />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  isOpen: true
}

const mapDispatchToProps = {

}

const mapStateToProps = state => {
  return {
    theme: state.map.theme,
    layers: state.map.layers,
    update: state.map.update
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)