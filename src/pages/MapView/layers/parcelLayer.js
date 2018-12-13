import { HOST } from './layerHost'
import { addLayers, removeLayers, addPopUp, toggleVisibility } from './utils'

const npmrdsLayer = {
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
        dataset: {
            name: 'Area',
            type: 'dropdown',
            domain: [ 
                {value:'36001', name:'Albany County'}
            ],
            value: '36001' 
        }
	},
	onAdd: addLayers,
	onRemove: removeLayers,
    toggleVisibility: toggleVisibility,
	active: false
}

function fetchData ( layer ) {
	
}

function recieveData ( layer, map) {

} 

export default npmrdsLayer;
