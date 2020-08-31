import axios from 'axios'

export async function getUsers() {
   const res = await axios.get('http://' + process.env.SERVERDOM + ':3001/api/user');
   return res.data;
}

export async function getUser(uID) {
   const res = await axios.get('http://' + process.env.SERVERDOM + ':3001/api/user/' + uID);
   return res.data;
}