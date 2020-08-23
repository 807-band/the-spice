import axios from 'axios'

export async function getUsers() {
   const res = await axios.get('http://' + process.env.SERVERDOM + ':3001/api/user');
   return res.data;
}

export async function getSections() {
   const res = await axios.get('http://' + process.env.SERVERDOM + ':3001/api/user/sections');
   return res.data;
}