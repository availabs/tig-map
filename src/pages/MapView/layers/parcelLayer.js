import { HOST } from './layerHost'
import { removeLayers, addPopUp, toggleVisibility } from './utils'

import store from "store"
import { falcorGraph } from "store/falcorGraph"
import { update } from "utils/redux-falcor/components/duck"
import { forceUpdate } from "../store/MapStore"

import { updateFilter } from "../store/MapStore"

import { scaleQuantile } from "d3-scale"

import { fnum } from "utils/sheldusUtils"

const MEASURE_RANGE = ['#b11021','#dc6147','#f4ae8c','#9bd0ea','#479acf','#2266b2']

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
            value: []
        },
        measure: {
            name: "Measure",
            type: "dropdown",
            domain: [{ value: "full_marke", name: "Full Market Value" }],
            value: "full_marke"
        }
	},
    legends: [
        {
            type: "quantile",
            domain: [],
            range: MEASURE_RANGE,
            title: "Measure Legend",
            format: fnum
        }
    ],
    onFilterFetch: layer => {
        const geoids = layer.filters.area.value;
        if (!geoids.length) {
            return Promise.resolve([]);
        }
        return falcorGraph.get(["parcel", "byGeoid", geoids, "length"])
            .then(res => {
                let max = -Infinity;
                geoids.forEach(geoid => {
                    const length = res.json.parcel.byGeoid[geoid].length;
                    max = Math.max(length, max);
                })
                console.log('length', max)
                return max;
            })
            .then(length => {
                return falcorGraph.get(["parcel", "byGeoid", geoids, "byIndex", { from: 0, to: length }, "id"])
                    .then(res => {
                        const parcelids = [];
                        geoids.forEach(geoid => {
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
    },
    receiveData: (parcelids, map) => {
        if (!parcelids.length) {
            map.setFilter('nys_1811_parcels', ["!in", "OBJECTID", "none"])
            map.setPaintProperty('nys_1811_parcels', 'fill-color', 'rgba(0,0,196,0.1)');
            parcelLayer.legends[0].domain = [];
            return;
        }
        map.setFilter('nys_1811_parcels', ["in", "OBJECTID", ...parcelids.map(d => +d)])
        const measure = parcelLayer.filters.measure.value,
            requests = [],
            num = 500;
        for (let i = 0; i < parcelids.length; i += num) {
            requests.push(parcelids.slice(i, i + num))
        }
        requests.reduce((a, c) => a.then(() => falcorGraph.get(["parcel", "byId", c, measure])), Promise.resolve())
            .then(() => {
                const graph = falcorGraph.getCache().parcel.byId,
                    values = {},
                    colors = {},
                    scale = scaleQuantile()
                        .range(MEASURE_RANGE),
                    domain = [];
                parcelids.forEach(pid => {
                    const value = graph[pid][measure];
                    values[pid] = value;
                    domain.push(value);
                })
                scale.domain(domain);
                parcelLayer.legends[0].domain = domain;
                store.dispatch(forceUpdate());
                for (const pid in values) {
                    colors[pid] = scale(values[pid])
                }
                map.setPaintProperty('nys_1811_parcels', 'fill-color', ["get", ["to-string", ["get", "OBJECTID"]], ["literal", colors]]);
            })
    },
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
                        const names = res.json.geo;
                        parcelLayer.filters.area.domain = counties.map(geoid => {
                            return { value: geoid, name: names[geoid].name }
                        })
                        // parcelLayer.filters.area.domain.unshift({ value: "none", name: "No County Filter" })
                    })
            })
            .then(() => store.dispatch(update(falcorGraph.getCache())))
            .then(() => store.dispatch(forceUpdate()))

        falcorGraph.get(["parcel", "byGeoid", '3600101000', "length"])
            .then(res => {
                return res.json.parcel.byGeoid['3600101000'].length;
            })
            .then(length => falcorGraph.get(["parcel", "byGeoid", "36001", "byIndex", { from: 0, to: length }, "id"]))
            .then(() => store.dispatch(updateFilter('parcelLayer', 'area', ['3600101000'])))

    },
	onRemove: removeLayers,
    toggleVisibility: toggleVisibility,
	active: false
}

export default parcelLayer;
