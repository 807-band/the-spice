import axios from 'axios'

export async function getStations() {
   const res = await axios.get('http://' + process.env.SERVERDOM + ':3001/api/station');
   return res.data;
}

export async function getStationData(id) {
   const res = await axios.get('http://' + process.env.SERVERDOM + ':3001/api/station/' + id);
   return res.data;
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
   await axios.put('http://' + process.env.SERVERDOM + ':3001/api/station/' + id + '/order', {
      order: order
   });
}

export async function putStation(id, title, description, maxFailed) {
   await axios.put('http://' + process.env.SERVERDOM + ':3001/api/station/' + id, {
      origin: 'http://localhost/stations/create',
      title: title,
      description: description,
      maxFailed: maxFailed
   });
}

export async function deleteStation(id) {
   await axios.delete('http://' + process.env.SERVERDOM + ':3001/api/station/' + id);
}

export async function postGrouping(id, title) {
   return await axios.post('http://' + process.env.SERVERDOM + ':3001/api/station/' + id, {
      origin: 'http://localhost/stations/create',
      title: title
   });
}

export async function putGrouping(sid, gid, title) {
   return await axios.put('http://' + process.env.SERVERDOM + ':3001/api/station/' + sid + '/' + gid, {
      title: title
   })
}

export async function deleteGrouping(sid, gid) {
   await axios.delete('http://' + process.env.SERVERDOM + ':3001/api/station/' + sid + '/' + gid);
}

export async function postItem(sid, gid, title, required) {
   required = required ? 1 : 0;
   return await axios.post('http://' + process.env.SERVERDOM + ':3001/api/station/' + sid + '/' + gid, {
      origin: 'http://localhost/stations/create',
      title: title,
      isRequired: required
   });
}

export async function deleteItem(sid, gid, iid) {
   await axios.delete('http://' + process.env.SERVERDOM + ':3001/api/station/' + sid + '/' + gid + '/' + iid);
}

export async function getInformation(id) {
   const res = await axios.get('http://' + process.env.SERVERDOM + ':3001/api/station/' + id + '/info');
   return res.data;
}

export async function putInformation(sid, iid, text) {
   await axios.put('http://' + process.env.SERVERDOM + ':3001/api/station/' + sid + '/info/' + iid, {
      text: text
   });
}
