import axios from 'axios'

export async function getSections() {
   const res = await axios.get('http://' + process.env.SERVERDOM + ':3001/api/section');
   return res.data;
}