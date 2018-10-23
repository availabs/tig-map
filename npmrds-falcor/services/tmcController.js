

module.exports = {

 tmcAttributes : (db_service, tmcArray, pathKeys) => {
    
    const sql = `
        SELECT tmc, ${pathKeys.join(',')}
        FROM public.tmc_attributes 
        WHERE tmc in ('${ tmcArray.join("','") }')
    `;
    // console.log('sql: ', sql)
    return db_service.promise(sql);
  },


 tmcMeasures : (db_service, tmcArray, years, pathKeys) => {
    
    const sql = `
        SELECT tmc, _year_ as year, length, ${pathKeys.join(',')}
        FROM public.pm3 
        WHERE tmc in ('${ tmcArray.join("','") }') 
        AND _year_ in (${years})
    `;

    // console.log('sql: ', sql)
    return db_service.promise(sql);
  },

  tmcDay : (db_service, tmcArray, dates ) => {
    // array_agg(a.tt) as tt
    const sql = `
        SELECT a.tmc, date,  '{"' || string_agg(cast(a.epoch as varchar) || '":' || cast(a.tt as varchar), ',"') || '}' as tt 
        FROM 
        (
            SELECT tmc,epoch,date,cast(travel_time_all_vehicles as int) as tt
            FROM ny.npmrds
            WHERE tmc in ('${ tmcArray.join("','") }') 
            AND date in ('${dates}')
        ) as a
        GROUP BY tmc, date
    `
    console.log('sql: ', sql)
    return db_service.promise(sql);
  },
  
  tmcAvgDay : (db_service, tmcArray, years ) => {
    // array_agg(a.tt) as tt
    const sql = `
        SELECT tmc, year, avg_day
        FROM ny.avgtt
        WHERE tmc in ('${ tmcArray.join("','") }') 
            AND year in ('${years}')
    `
    return db_service.promise(sql);
  }


  
}