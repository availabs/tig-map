const falcorJsonGraph = require('falcor-json-graph'),
	$atom = falcorJsonGraph.atom,
	tmcController = require("../services/tmcController")

const tt2speed = ['freeflowtt']

module.exports = [	

	{
		route: `tmc[{keys:tmcIds}].attributes["firstname", "nhs", "nhs_pct", "truck", "length", "road_number", "road_name", "road_direction", "occupancy_factor", "avg_speedlimit", "congestion_level", "directionality"]`,
		get: function(pathSet) {
			const pathKeys = pathSet[3]
			return tmcController.tmcAttributes(this.db_service, pathSet.tmcIds, pathKeys)
				.then(rows => {
					const result = [];
					rows.forEach(tmcRow => {
						pathKeys.forEach(pathKey => {
							result.push({
								path: ['tmc', tmcRow.tmc, 'attributes', pathKey],
								value: tmcRow[pathKey]
							})
						})
					})	
					return result;
				})
		}
	},

	{
		route: `tmc[{keys:tmcIds}].pm3[{integers:years}]['freeflowtt', 'vd_total', "aadt", "aadt_singl", "aadt_combi"]`,
		get: function(pathSet) {
			const pathKeys = pathSet[4]
			return tmcController.tmcMeasures(this.db_service, pathSet.tmcIds, pathSet.years, pathKeys)
				.then(rows => {
					const result = [];
					rows.forEach(tmcRow => {
						pathKeys.forEach(pathKey => {
							result.push({
								path: ['tmc', tmcRow.tmc, 'pm3', tmcRow.year, pathKey],
								value: tt2speed.includes(pathKey) ? 
									+ ( (tmcRow.length / tmcRow[pathKey]) * 3600) .toFixed(1) :
									+ tmcRow[pathKey]
							})
						})
					})	
					return result;
				})
		}
	},

	{
		route: `tmc[{keys:tmcIds}].day[{keys:dates}].tt`,
		get: function(pathSet) {
			const pathKeys = pathSet[4]
			return tmcController.tmcDay(this.db_service, pathSet.tmcIds, pathSet.dates)
				.then(rows => {
					const result = [];
					rows.forEach(tmcRow => {
						result.push({
							path: ['tmc', tmcRow.tmc, 'day', pgFormatDate(tmcRow.date), 'tt'],
							value:  $atom(JSON.parse(tmcRow.tt))
						})
					})	
					return result;
				})
		}
	},

	{
		route: `tmc[{keys:tmcIds}].year[{integers:years}].avgtt`,
		get: function(pathSet) {
			const pathKeys = pathSet[4]
			return tmcController.tmcAvgDay(this.db_service, pathSet.tmcIds, pathSet.years)
				.then(rows => {
					const result = [];
					rows.forEach(tmcRow => {
						result.push({
							path: ['tmc', tmcRow.tmc, 'year', tmcRow.year, 'avgtt'],
							value:  $atom(tmcRow.avg_day)
						})
					})	
					return result;
				})
		}
	}	
]


function pgFormatDate(date) {
  /* Via http://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date */
  function zeroPad(d) {
    return ("0" + d).slice(-2)
  }

  var parsed = new Date(date)

  return [parsed.getUTCFullYear(), zeroPad(parsed.getMonth() + 1), zeroPad(parsed.getDate())].join("-");
}