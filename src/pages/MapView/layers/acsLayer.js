const HOST = 'https://tig.nymtc.org/'
const npmrdsLayer = {
	name: 'Census ACS',
	mapBoxSources: {
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

  npmrdsLayer.mapBoxLayers.forEach(layer => {
  		map.addLayer(layer, 'waterway-label');
  })
}

export default npmrdsLayer;