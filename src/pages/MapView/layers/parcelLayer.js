import { HOST } from './layerHost'
import { removeLayers, addPopUp, toggleVisibility } from './utils'

import store from "store"
import { falcorGraph } from "store/falcorGraph"
import { update } from "utils/redux-falcor/components/duck"
import { forceUpdate } from "../store/MapStore"

const parcelLayer = {
	name: 'Parcel Data',
    type: 'Parcels',
	loading: false,
    visible: true,
	mapBoxSources: {
        nys_parcels: {
    		type: 'vector',
    		url: 'mapbox://am3081.6o6ny609'
        },  
    },
	mapBoxLayers: [
	   {
            'id': 'nys_1811_parcels',
            'source': 'nys_parcels',
            'source-layer': 'nys_1811_parcels',
            'minzoom': 10,
            'type': 'fill',
            'paint': {
                'fill-color': 'rgba(0,0,196,0.1)',
            }
        }
    ],
	filters: {
        area: {
            name: 'Area',
            type: 'dropdown',
            domain: [{ value: "choose", name: "Choose..."}],
            value: 'choose',
            onChange: (value, map) => {
                if (value === 'choose') {
                    map.setFilter('nys_1811_parcels', ["!in", "objectId", 'none'])
                    return;
                }
                falcorGraph.get(["parcel", "byGeoid", value, "length"])
                    .then(res => {
                        return res.json.parcel.byGeoid[value].length;
                    })
                    .then(length => {
                        return falcorGraph.get(["parcel", "byGeoid", value, "byIndex", { from: 0, to: length }, "id"])
                            .then(res => {
                                const parcelids = [],
                                    graph = res.json.parcel.byGeoid[value].byIndex;
                                for (let i = 0; i < length; ++i) {
                                    if (graph[i]) {
                                        parcelids.push(graph[i].id)
                                    }
                                }
                                return parcelids;
                            })
                    })
                    .then(parcelids => {
                        map.setFilter('nys_1811_parcels', ["in", "object_id", parcelids.join(",")])
                    })
                    .then(() => store.dispatch(update(falcorGraph.getCache())))
                    .then(() => store.dispatch(forceUpdate()))
            }
        }
	},
	onAdd: (mapLayer, map, beneath) => {
      beneath = beneath || 'waterway-label'
      
        Object.keys(mapLayer.mapBoxSources).forEach(source => {
            map.addSource(source, mapLayer.mapBoxSources[source])
        })

        mapLayer.mapBoxLayers.forEach(layer => {
            map.addLayer(layer, beneath);
        })
      
        falcorGraph.get(["geo", "36", "counties"])
            .then(res => {
                const counties = res.json.geo['36'].counties;
                return falcorGraph.get(["geo", counties, "name"])
                    .then(res => {
                        const names = res.json.geo;
                        parcelLayer.filters.area.domain = counties.map(geoid => {
                            return { value: geoid, name: names[geoid].name }
                        })
                        parcelLayer.filters.area.domain.unshift({ value: "choose", name: "Choose..." })
                    })
            })
            .then(() => store.dispatch(update(falcorGraph.getCache())))
            .then(() => store.dispatch(forceUpdate()))

    },
	onRemove: removeLayers,
    toggleVisibility: toggleVisibility,
	active: false
}

export default parcelLayer;
