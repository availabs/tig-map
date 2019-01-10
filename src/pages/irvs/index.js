import React, {Component} from 'react';
import { connect } from 'react-redux';

import IrvsEditor from "./components/IrvsEditor"

class IrvsContainer extends Component {
  render() {
    return (
      <div className="container">
        <IrvsEditor />
      </div>
    );
  }
}

const mapDispatchToProps = {
};

const mapStateToProps = state => ({
});

export default {
	icon: 'os-icon-map',
	path: '/irvs',
	exact: true,
	mainNav: true,
  menuSettings: {
    display: 'none',
    image: 'none',
    scheme: 'color-scheme-dark', 
    position: 'menu-position-left',
    layout: 'menu-layout-mini',
    style: 'color-style-default'  
  },
  name: 'IRVS Editor',
	auth: false,
	component: connect(mapStateToProps, mapDispatchToProps)(IrvsContainer)
}