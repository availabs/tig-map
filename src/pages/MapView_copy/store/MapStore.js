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
const UPDATE_LAYER_LEGEND = 'UPDATE_LAYER_LEGEND' 

const FORCE_UPDATE = "FORCE_UPDATE"
const UPDATE_TOOLTIP = "UPDATE_TOOLTIP"
const SET_LAYER_LOADING = "SET_LAYER_LOADING"
const TOGGLE_LAYER_MODAL = "TOGGLE_LAYER_MODAL"
const TOGGLE_INFO_BOX = "TOGGLE_INFO_BOX"

const UPDATE_DRAG = "UPDATE_DRAG"
const DROP_LAYER = "DROP_LAYER"

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
    const prev = getState().map.layers[layerName].filters[filterName].value
    return (
      dispatch({
        type: UPDATE_LAYER_FILTER,
        layerName,
        filterName,
        value
      }), 
      Promise.resolve()
    ).then(()=> {
      if(getState().map.layers[layerName].onFilterFetch) {
        return getState().map.layers[layerName].onFilterFetch(getState().map.layers[layerName], filterName, prev, value)
        .then(data => {
          console.log('did we get data?')
          dispatch(receiveData(data,layerName))
        })
      } else {
        return Promise.resolve();
      }
    })
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
    type: FORCE_UPDATE
  })

export const updateLegend = (layerName, update) =>
  (dispatch, getState) => {
    const layer = getState().map.layers[layerName];
    if (!layer.legend) return;

    layer.loading = true;
    dispatch(forceUpdate());

    layer.legend = {
      ...layer.legend,
      ...update
    }
    return layer.legend.onChange(layer)
      .then(data => dispatch(receiveData(data, layerName)))
  }

export const toggleModal = layerName =>
  (dispatch, getState) => {
    const layer = getState().map.layers[layerName],
      show = layer.modal ? !layer.modal.show : false;
    dispatch({
      type: TOGGLE_LAYER_MODAL,
      layerName,
      show
    })
  }
export const toggleInfoBox = (layerName, infoBoxName) =>
  (dispatch, getState) => {
    const layer = getState().map.layers[layerName],
      infobox = layer.infoBoxes[infoBoxName],
      show = !infobox.show;
    dispatch({
      type: TOGGLE_INFO_BOX,
      layerName,
      infoBoxName,
      show
    })
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

export const updateTooltip = update =>
  dispatch => dispatch({
    type: UPDATE_TOOLTIP,
    update
  })

export const updateDrag = update =>
  dispatch => dispatch({
    type: UPDATE_DRAG,
    update
  })
export const dropLayer = () =>
  dispatch => dispatch({
    type: DROP_LAYER
  })


// -------------------------------------
// Initial State
// -------------------------------------

const initialState = {
  layers,
  map: null,
  activeRange: ['#b11021','#dc6147','#f4ae8c','#9bd0ea','#479acf','#2266b2'],
  activeDomain: [10,20,30,40,55],
  loadingTMC: false,
  theme: LightTheme,
  update: 0,
  tooltip: {
    pos: [0, 0],
    data: [],
    pinned: false
  },
  activeLayers: [],
  dragging: null,
  dragover: -1
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [DROP_LAYER]: (state=initialState, action) => {
    const newState = { ...state };
    newState.activeLayers = newState.activeLayers.filter(l => l !== newState.dragging);
    newState.activeLayers.splice(newState.dragover, 0, newState.dragging)
    ++newState.update;
    newState.dragging = null;
    newState.dragover = -1;

    newState.activeLayers.forEach(al => {
      newState.layers[al].mapBoxLayers.forEach(mbl => {
        newState.map.removeLayer(mbl.id);
      })
    })

    newState.activeLayers.forEach(al => {
      newState.layers[al].mapBoxLayers.forEach(mbl => {
        newState.map.addLayer(mbl);
      })
      if (newState.layers[al].onFilterFetch) {
        newState.layers[al].onFilterFetch(newState.layers[al])
          .then(data => newState.layers[al].receiveData(data, newState.map))
      }
    })
    return newState;
  },
  [UPDATE_DRAG]: (state=initialState, action) => ({
    ...state,
    ...action.update,
    //update: ++state.update
  }),
  [TOGGLE_INFO_BOX]: (state=initialState, action) => {
    const newState = { ...state };
    ++newState.update;
    const layer = newState.layers[action.layerName];
    layer.infoBoxes[action.infoBoxName].show = action.show;
    return newState;
  },
  [TOGGLE_LAYER_MODAL]: (state=initialState, action) => {
    const newState = { ...state };
    ++newState.update;
    for (const ln in newState.layers) {
      const layer = newState.layers[ln];
      if (layer.modal) {
        layer.modal.show = false;
      }
    }
    const layer = newState.layers[action.layerName];
    if (layer.modal) {
      layer.modal.show = action.show;
    }
    return newState;
  },
  [UPDATE_TOOLTIP]: (state=initialState, action) => ({
    ...state,
    tooltip: {
      ...state.tooltip,
      ...action.update
    }
  }),
  [FORCE_UPDATE]: (state=initialState, action) => ({
    ...state,
    update: ++state.update
  }), // hack to force update on deep props
  [ADD_LAYER]: (state = initialState, action) => {
    let newState = Object.assign({}, state);
    if(state.map){
      let newLayer = newState.layers[action.layerName]
      if(newLayer.onAdd){
        newLayer.onAdd(newLayer, state.map)
      }
      newLayer.active = true
    }
    newState.activeLayers.push(action.layerName);
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
    newState.activeLayers = newState.activeLayers.filter(l => l !== action.layerName)
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
    ++newState.update; // hack to force update on deep props
    return newState;
  },
  [UPDATE_LAYER_FILTER]: (state = initialState, action) => {
    let newState = Object.assign({}, state);
    const layer = newState.layers[action.layerName],
      filter = layer.filters[action.filterName];
    filter.value = action.value;
    newState.layers[action.layerName].loading = !!newState.layers[action.layerName].onFilterFetch;
    ++newState.update; // hack to force update on deep props
    return newState
  }
};

export default function TigMapReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  console.log('handler', action.type)
  return handler ? handler(state, action) : state;
}