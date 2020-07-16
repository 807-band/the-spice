import axios from 'axios'

export async function getStations() {
   const res = await axios.get('http://localhost:3001/api/station')
   return res.data
}

export async function getStationData(id) {
   const res = await axios.get('http://localhost:3001/api/station/' + id)
   return res.data
}

export async function postStation(title, description, rank, order) {
   await axios.post('http://' + (process.env.SERVERDOM || 'localhost') + ':3001/api/station/', { 
      origin: 'http://localhost/stations/create',
      title: title,
      description: description,
      rank: rank,
      order: order
   });
}

export async function getAllStationIds() {
   const res = await axios.get('http://localhost:3001/api/station')
   const stations = res.data
   var ids = []  
   
   for(var i = 0; i < stations.length; i++) {
      ids.push(stations[i].id)
   }

   // must be in a specific format. . . see https://nextjs.org/learn/basics/dynamic-routes/implement-getstaticpaths
   return ids.map(stationId => {
      return {
         params: {
            id: stationId
         }
      }
   })
}
