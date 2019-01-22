import React from "react"

import {
    ArrowDown,
    ArrowRight
} from "components/common/icons"

import MapLayer from "AvlMap/MapLayer"

const threedLayer = new MapLayer("Buildings Layer 3d", {
  active: false,
  sources: [
    { id: "buildings-3d",
      source: {
        'type': "vector",
        'url': 'mapbox://mapbox.mapbox-streets-v7'
      }
    }
  ],
  layers: [
    { 'id': 'buildings_layer_3d',
        'source': 'buildings-3d',
        'source-layer': 'building',
        'type': 'fill-extrusion',
        'filter': ['==', 'extrude', 'true'],
        'minzoom': 14,
        'paint': {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
                "interpolate", ["linear"], ["zoom"],
                15, 0,
                15.05, ["get", "height"]
            ],
            'fill-extrusion-base': [
                "interpolate", ["linear"], ["zoom"],
                15, 0,
                15.05, ["get", "min_height"]
            ],
            'fill-extrusion-opacity': 1
        }
    }
  ]
})

export default threedLayer;
