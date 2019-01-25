import React from 'react';

import Logo from "components/mitigate-ny/Logo"

import AvlMap from "AvlMap"
import MapLayer from "AvlMap/MapLayer"

import buildingsLayer from "./layers/buildingsLayer"
import parcelLayer from "./layers/parcelLayer"
import threedLayer from "./layers/3d-buildingsLayer"

const SidebarHeader = ({}) =>
  <div style={ { paddingLeft: "50px" } }><Logo width={ 200 }/></div>

const MapPage = ({}) =>
  <div style={ { height: "100vh" } }>
    <AvlMap layers={ [
        buildingsLayer,
        parcelLayer,
        threedLayer
      ] }
      header={ SidebarHeader }
      center={ [-73.8014, 42.6719] }
      minZoom={ 2 }
      zoom={ 13 }/>
  </div>

export default {
	icon: 'os-icon-map',
	path: '/',
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
  name: 'MapPage',
	auth: true,
	component: MapPage
}
