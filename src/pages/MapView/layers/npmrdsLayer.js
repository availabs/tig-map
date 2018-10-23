const npmrdsLayer = {
	name: 'NPMRDS',
	mapBoxSources: {
		npmrds: {
    		type: 'vector',
    		url: 'mapbox://am3081.2yitmtuu'
  		}
  	},
	mapBoxLayers: [
		{
		    id: 'interstate-symbology',
		    type: 'line',
		    source: 'npmrds',
		    'source-layer': 'tmcsAttrs',
		    layout: {
		      'line-join': 'round',
		      'line-cap': 'round'
		    },
		    paint: {
		      'line-color': 'pink',
		      'line-width': {
		        base: 1.5,
		        stops: [[3, 1], [13, 5], [18, 8]]
		      },
		      'line-offset': {
		        base: 1.5,
		        stops: [[5, 0], [9, 1], [15, 3], [18, 7]]
		      }
		    },
		    filter: ['all', ['in', 'ua_code','63217'], ['in', 'f_system', 1, 2]]
	  	},
	  	{
		    id: 'primary-symbology',
		    type: 'line',
		    source: 'npmrds',
		    'source-layer': 'tmcsAttrs',
		    layout: {
		      'line-join': 'round',
		      'line-cap': 'round'
		    },
		    paint: {
		      'line-color': 'pink',
		      'line-width': {
		        base: 1.5,
		        stops: [[5, 1], [18, 7]]
		      },
		      'line-offset': {
		        base: 1.5,
		        stops: [[10, 0.5], [18, 10]]
		      }
		    },
		    filter: ['all', ['!in', 'f_system', 1, 2],['in', 'ua_code','63217']]
		}
	],
	geojsonLayers: [],
	filters: [
		{
			name: 'Year',
			type: 'dropdown',
			options: [2016,2017,2018],
			value: 2017
		},
		{
			name: 'Month',
			type: 'dropdown',
			options: ['January','February','March'],
			value: 'February'
		},
		{
			name: 'Day Of Week',
			type: 'dropdown',
			options: ['Monday', 'Tuesday', 'Wednesday'],
			value: 'Tuesday'
		},
	],
	onAdd: addLayers,
	onRemove: removeLayers,
	active: false
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