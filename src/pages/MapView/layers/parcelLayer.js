import { HOST } from './layerHost'
import { removeLayers, toggleVisibility } from './utils'

import store from "store"
import { falcorGraph } from "store/falcorGraph"
import { update } from "utils/redux-falcor/components/duck"
import {
    forceUpdate,
    updateFilter,
    updateTooltip
} from "../store/MapStore"

import {  } from "../store/MapStore"

import {
    scaleQuantile,
    scaleOrdinal,
    scaleQuantize
} from "d3-scale"

import { fnum } from "utils/sheldusUtils"

import COLOR_RANGES from "constants/color-ranges"

const MEASURES = [
    { value: "full_marke", name: "Full Market Value" },
    { value: "prop_class", name: "Property Type" }
]
const getMeasureLabel = value =>
    MEASURES.reduce((a, c) => c.value === value ? c.name : a, value);
const getMeasureFormat = (measure, value) => {
    switch (measure) {
        case "prop_class":
            value = +value;
            if (value < 100) return "Unknown"
            if (value < 200) return "Agricultural"
            if (value < 300) return "Residential"
            if (value < 400) return "Vacant Land"
            if (value < 500) return "Commercial"
            if (value < 600) return "Recreation & Entertainment"
            if (value < 700) return "Community Services"
            if (value < 800) return "Industrial"
            if (value < 900) return "Public Services"
            return "Wild, Forested, Conservation Lands & Public Parks"
        default:
            return `$${ fnum(value) }`;
    }
}
const QUANTILE_RANGE = COLOR_RANGES[5].reduce((a, c) => c.name === "RdYlBu" ? c.colors : a)
// const QUANTILE_RANGE = ['#b11021','#dc6147','#f4ae8c','#9bd0ea','#479acf','#2266b2']

const onFilterFetch = (layer, filterName, prev, value) => {
    if (filterName === "measure") {
        onMeasureChange(prev, value);
    }
    const geoids = layer.filters.area.value;
    if (!geoids.length) {
        return Promise.resolve({ parcelids: [] });
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
        .then(parcelids => {
            const requests = [],
                num = 500;
            for (let i = 0; i < parcelids.length; i += num) {
                requests.push(parcelids.slice(i, i + num))
            }
            return requests.reduce((a, c) => a.then(() => falcorGraph.get(["parcel", "byId", c, MEASURES.map(m => m.value)])), Promise.resolve())
                .then(() => {
                    const measure = parcelLayer.filters.measure.value;
                    let colors = {};
                    if (measure === "prop_class") {
                        colors = processPropType(parcelids);
                    }
                    else {
                        colors = processFullMarket(parcelids);
                    }
                    return { colors, parcelids };
                })
        })
}

const processPropType = parcelids => {
    const measure = parcelLayer.filters.measure.value,
        graph = falcorGraph.getCache().parcel.byId,

        values = {},
        colors = {},

        domainMap = {},

        scale = scaleOrdinal();

    parcelids.forEach(pid => {
        let value = graph[pid][measure];
        if (value) {
            value = +(graph[pid][measure].toString()[0]) * 100;
            values[pid] = value;
            domainMap[value] = true;
        }
    })

    const domain = Object.keys(domainMap);

    let range = parcelLayer.legend.range;
    if (range.length !== domain.length) {
        range = COLOR_RANGES[domain.length].reduce((a, c) => c.type === "qualitative" ? c.colors : a);
    }

    scale.domain(domain)
        .range(range);

    parcelLayer.legend.domain = domain;
    parcelLayer.legend.range = range;

    for (const pid in values) {
        colors[pid] = scale(values[pid])
    }
    return colors
}

const processFullMarket = parcelids => {
    const measure = parcelLayer.filters.measure.value,
        graph = falcorGraph.getCache().parcel.byId,

        values = {},
        colors = {},

        domain = [];

    let min = Infinity,
        max = -Infinity,

        scale;

    parcelids.forEach(pid => {
        const value = graph[pid][measure];
        values[pid] = value;
        domain.push(value);
        min = Math.min(min, value);
        max = Math.max(max, value);
    })

    const type = parcelLayer.legend.type,
        range = parcelLayer.legend.range;
    switch (type) {
        case "quantile":
            scale = scaleQuantile()
                .domain(domain)
                .range(range);
            parcelLayer.legend.domain = domain;
            break;
        case "quantize":
            scale = scaleQuantize()
                .domain([min, max])
                .range(range);
            parcelLayer.legend.domain = [min, max];
            break;
    }

    for (const pid in values) {
        colors[pid] = scale(values[pid])
    }
    return colors
}

const NON_ORDINAL_LEGEND = {
    type: "quantile",
    types: ["quantile", "quantize"],
    format: getMeasureFormat.bind(null, "full_marke"),
    vertical: false,
    range: QUANTILE_RANGE
}

const onMeasureChange = (prevValue, newValue) => {
    if (prevValue === "full_marke" && newValue === "prop_class") {
        parcelLayer.legend.type = "ordinal";
        parcelLayer.legend.types = ["ordinal"]
        parcelLayer.legend.format = getMeasureFormat.bind(null, "prop_class")
        parcelLayer.legend.vertical = true
    }
    else if (prevValue === "prop_class" && newValue === "full_marke") {
        parcelLayer.legend = {
            ...parcelLayer.legend,
            ...NON_ORDINAL_LEGEND
        }
    }
}

const parcelLayer = {
	name: 'Parcel Data',
    type: 'Parcels',
	loading: true,
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
            domain: MEASURES,
            value: "full_marke",
            onChange: onMeasureChange
        }
	},
    legend: {
        active: true,

        ...NON_ORDINAL_LEGEND,

        type: "quantile",

        domain: [],

        onChange: onFilterFetch,

        title: "Parcel Legend"
    },
    onFilterFetch,
    receiveData: ({ colors, parcelids }, map) => {
        if (!parcelids.length) {
            map.setFilter('nys_1811_parcels', ["!in", "OBJECTID", "none"])
            map.setPaintProperty('nys_1811_parcels', 'fill-color', 'rgba(0,0,196,0.1)');
            parcelLayer.legend.active = false;
            return;
        }
        parcelLayer.legend.active = true;
        map.setFilter('nys_1811_parcels', ["in", "OBJECTID", ...parcelids.map(d => +d)])
        map.setPaintProperty('nys_1811_parcels', 'fill-color', ["get", ["to-string", ["get", "OBJECTID"]], ["literal", colors]]);
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

        addPopUp(map, 'nys_1811_parcels', feature => {
            const id = feature.properties.OBJECTID;
            try {
                const graph = falcorGraph.getCache().parcel.byId,
                    measure = parcelLayer.filters.measure.value;
                return [
                    "PARCEL DATA",
                    [getMeasureLabel(measure), getMeasureFormat(measure, graph[id][measure])]
                ]
            }
            catch (e) {
                return []
            }
        })

        const geoLevel = "cousubs";

        falcorGraph.get(["geo", "36", geoLevel])
            .then(res => res.json.geo['36'][geoLevel])
            .then(geoids => {
                const requests = [],
                    num = 500;
                for (let i = 0; i < geoids.length; i += num) {
                    requests.push(geoids.slice(i, i + num))
                }
                return requests.reduce((a, c) => a.then(() => falcorGraph.get(["geo", c, "name"])), Promise.resolve())
                    .then(() => {
                        const graph = falcorGraph.getCache().geo;
                        parcelLayer.filters.area.domain = geoids.map(geoid => {
                            return { value: geoid, name: graph[geoid].name }
                        })
                    })
                // return falcorGraph.get(["geo", geoids, "name"])
                //     .then(res => {
                //         const names = res.json.geo;
                //         parcelLayer.filters.area.domain = geoids.map(geoid => {
                //             return { value: geoid, name: names[geoid].name }
                //         })
                //     })
            })
            .then(() => store.dispatch(update(falcorGraph.getCache())))
            .then(() => store.dispatch(forceUpdate()))

        falcorGraph.get(["parcel", "byGeoid", '3600101000', "length"])
            .then(res => {
                return res.json.parcel.byGeoid['3600101000'].length;
            })
            .then(length => falcorGraph.get(["parcel", "byGeoid", "3600101000", "byIndex", { from: 0, to: length }, "id"]))
            .then(() => store.dispatch(updateFilter('parcelLayer', 'area', ['3600101000'])))

    },
	onRemove: removeLayers,
    toggleVisibility: toggleVisibility,
	active: false
}

const addPopUp = (map, layer, dataFunc) => {

    map.on("mousemove", layer, e => {
        map.getCanvas().style.cursor = 'pointer';

        const { pinned } = store.getState().map.tooltip;
        if (pinned) return;

        if ((typeof dataFunc === "function") && e.features.length) {
            store.dispatch(updateTooltip({
                pos: [e.point.x, e.point.y],
                data: dataFunc(e.features[0])
            }))
        }
    })

    map.on('mouseleave', layer, function() {
        map.getCanvas().style.cursor = '';

        const { pinned } = store.getState().map.tooltip;
        if (pinned) return;

        store.dispatch(updateTooltip({
            data: []
        }))
    });

    map.on('click', layer, e => {
        const { pinned } = store.getState().map.tooltip;
        if ((typeof dataFunc === "function") && e.features.length) {
            const data = dataFunc(e.features[0]);
            if (data.length) {
                if (pinned) {
                    store.dispatch(updateTooltip({
                        pos: [e.point.x, e.point.y],
                        data
                    }))
                }
                else {
                    store.dispatch(updateTooltip({
                        pinned: true
                    }))
                }
            }
            else {
                store.dispatch(updateTooltip({
                    pinned: false
                }))
            }
        }
    })
}

export default parcelLayer;
