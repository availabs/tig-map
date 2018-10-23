import layers from '../layers'
import LightTheme from 'components/common/themes/light'
// var update = require('react/lib/update')

// ------------------------------------
// Constants
// ------------------------------------
const ACTIVATE_LAYER = 'ACTIVATE_LAYER'
const INITIALIZE_MAP = 'INITIALIZE_MAP'

// ------------------------------------
// Actions
// ------------------------------------

export const activateLayer = layer => {
   return dispatch => (
    dispatch({
      type: ACTIVATE_LAYER,
      layer
    }), Promise.resolve())
}

export const initializeMap = map => {
   return dispatch => (
    dispatch({
      type: INITIALIZE_MAP,
      map
    }), Promise.resolve())
}



// -------------------------------------
// Initial State
// -------------------------------------

let initialState = {
  layers,
  map: null,
  activeRange: ['#2266b2', '#479acf', '#9bd0ea', '#f4ae8c', '#dc6147', '#b11021'],
  activeDomain: [0,2,5,15,20],
  loadingTMC: false,
  theme: LightTheme,
  update: 0
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ACTIVATE_LAYER]: (state = initialState, action) => {
    let newState = Object.assign({}, state);
    if(state.map){
      let newLayer = newState.layers[action.layer]
      if(newLayer.onAdd){
        newLayer.onAdd(state.map)
      }
      newLayer.active = true
      
    }
    newState.update += 1;
    return newState;
  },
  [INITIALIZE_MAP]: (state = initialState, action) => {
    let newState = Object.assign({}, state);
    newState.map = action.map
    return newState;
  }
};

export default function TigMapReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  console.log('handler', action.type)
  return handler ? handler(state, action) : state;
}