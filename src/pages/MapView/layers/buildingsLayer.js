import { addLayers, removeLayers, toggleVisibility } from './utils'

const buildingsLayer = {
	name: 'NYS Buildings',
    type: 'buildings',
	loading: false,
    visible: true,
	mapBoxSources: {
        buildings: {
    		type: 'vector',
    		url: 'mapbox://am3081.5ki8tlog'
        },  
    },
	mapBoxLayers: [
	   {
            'id': 'buildings_layer',
            'source': 'buildings',
            'source-layer': 'NewYork',
            'type': 'fill',
            'paint': {
                'fill-color': 'rgba(196, 0, 0, 0.1)',
            }
        }
    ],
	onAdd: addLayers,
	onRemove: removeLayers,
    toggleVisibility,
	active: false
}

export default buildingsLayer