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
            type: 'multi',
            domain: [],
            value: [],
            onChange: (value, map) => {
                if (value.length === 0) {
                    return map.setFilter('nys_1811_parcels', ["!in", "objectID", 'none']);
                }
                falcorGraph.get(["parcel", "byGeoid", value, "length"])
                    .then(res => {
                        let max = -Infinity;
                        value.forEach(geoid => {
                            const length = res.json.parcel.byGeoid[geoid].length;
                            max = Math.max(length, max);
                        })
                        return max;
                    })
                    .then(length => {
                        return falcorGraph.get(["parcel", "byGeoid", value, "byIndex", { from: 0, to: length }, "id"])
                            .then(res => {
                                const parcelids = [];
                                value.forEach(geoid => {
                                    const graph = res.json.parcel.byGeoid[geoid].byIndex;
                                    for (let i = 0; i < length; ++i) {
                                        if (graph[i]) {
                                            parcelids.push(graph[i].id)
                                        }
                                    }
                                })
                                return parcelids;
                            })
                    })
                    .then(parcelids => {
                        map.setFilter('nys_1811_parcels', ["in", "OBJECTID", ...parcelids.map(d => +d)])
                    })
                    .then(() => store.dispatch(update(falcorGraph.getCache())))
                    .then(() => store.dispatch(forceUpdate()))
            }
        }
	},
    legends: [
        {
            type: "ordinal",
            domain: [1, 3, 5],
            range: ["red", "yellow", "green"],
            title: "Test Ordinal"
        },
        {
            type: "linear",
            domain: [1, 3, 5],
            range: ["red", "yellow", "green"],
            title: "Test Linear"
        },
        {
            type: "quantile",
            domain: [1, 2, 3, 4, 5],
            range: ["red", "yellow", "green"],
            title: "Test Quantile"
        }
    ],
	onAdd: (mapLayer, map, beneath) => {
        beneath = beneath || 'waterway-label'
        console.log('parcel layer on add')
        Object.keys(mapLayer.mapBoxSources).forEach(source => {
            map.addSource(source, mapLayer.mapBoxSources[source])
        })

        mapLayer.mapBoxLayers.forEach(layer => {
            map.addLayer(layer, beneath);
        })
        let popUpOptopns = {
            rows: ['OBJECTID']
        }

        //addPopUp(map, 'nys_1811_parcels', popUpOptopns)
      
        // map.on('mouseenter', 'nys_1811_parcels', function(e) {
        //     console.log('hover:',e.features[0].properties.OBJECTID)
        // })

        falcorGraph.get(["geo", "36", "counties"])
            .then(res => res.json.geo['36'].counties)
            .then(counties => {
                return falcorGraph.get(["geo", counties, "name"])
                    .then(res => {
                        console.log('got data', counties)
                        const names = res.json.geo;
                        parcelLayer.filters.area.domain = counties.map(geoid => {
                            return { value: geoid, name: names[geoid].name }
                        })
                        // parcelLayer.filters.area.domain.unshift({ value: "none", name: "No County Filter" })
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
