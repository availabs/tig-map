import layers from '../layers'
import LightTheme from 'components/common/themes/dark'
// var update = require('react/lib/update')

// ------------------------------------
// Constants
// ------------------------------------
const INITIALIZE_MAP = 'INITIALIZE_MAP'


// Layer Actions
const ADD_LAYER = 'ADD_LAYER'
const REMOVE_LAYER = 'REMOVE_LAYER'
const TOGGLE_LAYER_VISIBILITY = 'TOGGLE_LAYER_VISIBILITY'


// Data Actions
const FETCH_LAYER_DATA = 'FETCH_LAYER_DATA'
const FETCH_LAYER_DATA_SUCESS = 'FETCH_LAYER_DATA_SUCESS'
const FETCH_LAYER_DATA_ERROR = 'FETCH_LAYER_DATA_ERROR'
const UPDATE_LAYER_FILTER = 'UPDATE_LAYER_FILTER' 

// ------------------------------------
// Actions
// ------------------------------------

export const addLayer = layerName => {
  return dispatch =>
    (dispatch({
      type: ADD_LAYER,
      layerName
    }),
    Promise.resolve())
    .then(() => dispatch(fetchLayerData(layerName)))
}

export const removeLayer = layerName => {
  return dispatch => {
    return dispatch({
      type: REMOVE_LAYER,
      layerName
    })
  }
}

export const toggleLayerVisibility = layerName => {
  return dispatch => {
    return dispatch({
      type: TOGGLE_LAYER_VISIBILITY,
      layerName
    })
  }
}

export const initializeMap = map => {
  return dispatch => {
    return dispatch({
      type: INITIALIZE_MAP,
      map
    })
  }
}

export const receiveData = (data,layerName) => {
  return dispatch => {
    return dispatch({
      type: FETCH_LAYER_DATA_SUCESS,
      data,
      layerName
    })
  }
}

export const updateFilter = (layerName, filterName, value) => {
  return (dispatch, getState) => {
    return (
      dispatch({
        type: UPDATE_LAYER_FILTER,
        layerName,
        filterName,
        value
      }), 
      Promise.resolve()
    )/*.then(()=> {
      if(getState().map.layers[layerName].onFilterFetch) {
        return getState().map.layers[layerName].onFilterFetch(getState().map.layers[layerName])
        .then(data => {
          console.log('did we get data?')
          dispatch(receiveData(data,layerName))
        })
      } else {
        return Promise.resolve();
      }
    })*/
  }
}

export const fetchLayerData = (layerName) => {
  return  (dispatch, getState) => {
    if(getState().map.layers[layerName].fetchData) {
      return (dispatch({
        type: FETCH_LAYER_DATA,
        layerName
      }),Promise.resolve()).then(()=> {
        return getState().map.layers[layerName].fetchData(getState().map.layers[layerName])
        .then(data => {
          dispatch(receiveData(data,layerName))
        })
      })
    } else {
      console.warn(`Layer ${layerName} does not define fetchData`)
      return Promise.resolve();
    }
  }
}

export const forceUpdate = () =>
  dispatch => dispatch({
    type: "FORCE_UPDATE"
  })

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
  activeRange: ['#b11021','#dc6147','#f4ae8c','#9bd0ea','#479acf','#2266b2'],
  activeDomain: [10,20,30,40,55],
  loadingTMC: false,
  theme: LightTheme,
  update: 0
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  "FORCE_UPDATE": (state=initialState, action) => {
    return {
      ...state,
      update: ++state.update
    } // hack to force update on deep props
  },
  [ADD_LAYER]: (state = initialState, action) => {
    let newState = Object.assign({}, state);
    if(state.map){
      let newLayer = newState.layers[action.layerName]
      if(newLayer.onAdd){
        newLayer.onAdd(newLayer, state.map)
      }
      newLayer.active = true
    }
    newState.update += 1; // hack to force update on deep props
    return newState;
  },
  [REMOVE_LAYER]: (state = initialState, action) => {
    let newState = Object.assign({}, state);
    if(state.map){
      let newLayer = newState.layers[action.layerName]
      if(newLayer.onRemove){
        newLayer.onRemove(newLayer, state.map)
      }
      newLayer.active = false
    }
    newState.update += 1; // hack to force update on deep props
    return newState;
  },
  [TOGGLE_LAYER_VISIBILITY]: (state = initialState, action) => {
    let newState = Object.assign({}, state);
    if(state.map){
      let newLayer = newState.layers[action.layerName]
      if(newLayer.toggleVisibility){
        newLayer.toggleVisibility(newLayer, state.map)
      }
      console.log(newLayer.visible)
      newLayer.visible = !newLayer.visible
      console.log(newLayer.visible)
    }
    newState.update += 1; // hack to force update on deep props
    return newState;
  },
  [INITIALIZE_MAP]: (state = initialState, action) => {
    let newState = Object.assign({}, state);
    newState.map = action.map
    return newState;
  },
  [FETCH_LAYER_DATA]: (state = initialState, action) => {
    let newState = Object.assign({}, state);
    newState.layers[action.layerName].loading = true;
    return newState;
  },
  [FETCH_LAYER_DATA_SUCESS]: (state = initialState, action) => {
    let newState = Object.assign({}, state);
    newState.layers[action.layerName].loading = false;
    if(state.map) {
      newState.layers[action.layerName].receiveData(action.data, state.map, state.activeRange, state.activeDomain)
    }
    return newState;
  },
  [UPDATE_LAYER_FILTER]: (state = initialState, action) => {
    let newState = Object.assign({}, state);
    const layer = newState.layers[action.layerName],
      filter = layer.filters[action.filterName];
    filter.value = action.value;
    if (filter.onChange && newState.map) {
      filter.onChange(action.value, newState.map);
    }
    newState.update += 1; // hack to force update on deep props
    return newState
  }
};

export default function TigMapReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  console.log('handler', action.type)
  return handler ? handler(state, action) : state;
}