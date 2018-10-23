const HOST = 'https://tig.nymtc.org/'
const npmrdsLayer = {
	name: 'Census ACS',
	mapBoxSources: {
    nymtc_areas: {
    		type: 'vector',
    		url: 'mapbox://am3081.32hog1ls'
    },
  	},
  	type: 'Road Lines',
	mapBoxLayers: [
	],
	geojsonLayers: [],
	filters: {
	},
	onAdd: addLayers,
	onRemove: removeLayers,
	active: false
}

function fetchData ( layer ) {
	
}

function recieveData ( layer, map) {

} 

function removeLayers (map) {
	npmrdsLayer.mapBoxLayers.forEach(layer => {
  		map.removeLayer(layer.id)
  	})
	map.removeLayer('interstate-symbology')
}

function addLayers (map)  {
  
  Object.keys(npmrdsLayer.mapBoxSources).forEach(source => {
  	map.addSource(source, npmrdsLayer.mapBoxSources[source])
  })

    map.addLayer({
        'id': 'counties',
        'source': 'nymtc_areas',
        'source-layer': 'counties',
        'maxzoom': 10,
        'type': 'fill',
        'paint': {
            'fill-color': 'rgba(0,0,196,0.25)',
            // 'fill-opacity': 0.05
        }
    }, 'waterway-label');

    map.addLayer({
        'id': 'census_tracts',
        'source': 'nymtc_areas',
        'source-layer': 'census_tracts',
        'minzoom': 10,
        'maxzoom': 18,
        'type': 'fill',
        'paint': {
            'fill-color': 'rgba(0,0,196,0.25)',
        }
    }, 'waterway-label');

    // map.addLayer({
        // 'id': 'tazs',
        // 'source': 'nymtc_areas',
        // 'source-layer': 'tazs',
        // 'minzoom': 18,
        // 'type': 'fill',
        // 'paint': {
            // 'fill-color': 'rgba(0,0,196,0.25)',
        // }
    // }, 'waterway-label');

}

export default npmrdsLayer;
