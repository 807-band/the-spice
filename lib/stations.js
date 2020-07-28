import axios from 'axios'

export async function getStations() {
   const res = await axios.get('http://' + process.env.SERVERDOM + ':3001/api/station')
   return res.data
}

export async function getStationData(id) {
   const res = await axios.get('http://' + process.env.SERVERDOM + ':3001/api/station/' + id)
   return res.data
}

export async function postStation(title, description, rank, order) {
   await axios.post('http://' + process.env.SERVERDOM + ':3001/api/station/', { 
      origin: 'http://localhost/stations/create',
      title: title,
      description: description,
      rank: rank,
      order: order
   });
}

export async function updateOrder(id, order) {
   await axios.put('http://' + process.env.SERVERDOM + ':3001/api/station/' + id, {
      origin: 'http://localhost/stations-backup-temp',
      order: order
   });
}
