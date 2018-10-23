import layers from '../layers'
import LightTheme from 'components/common/themes/light'
// var update = require('react/lib/update')

// ------------------------------------
// Constants
// ------------------------------------
const ACTIVATE_LAYER = 'ACTIVATE_LAYER'
const INITIALIZE_MAP = 'INITIALIZE_MAP'
const FETCH_LAYER_DATA = 'FETCH_LAYER_DATA'
const FETCH_LAYER_DATA_SUCESS = 'FETCH_LAYER_DATA_SUCESS'
const FETCH_LAYER_DATA_ERROR = 'FETCH_LAYER_DATA_ERROR'
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

export const recieveLayerData = (layerName,data) => {
   return dispatch => (
    dispatch({
      type: INITIALIZE_MAP,
      layerName,
      data
    }), Promise.resolve())
}

// export const fetchLayerData = (layerName) => {
//   return dispatch => {
//     // console.log('----- USER LOGIN -----');
    
//     return fetch(`${HOST}login/auth`, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json, text/plain, */*',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ email: user.email, password: user.password, token: user.token })
//     })
//       .then(response => response.json())
//       .then(json => dispatch(receiveAuthResponse(json.message || json)));
//   };
// };



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