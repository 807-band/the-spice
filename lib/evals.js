import axios from 'axios';

export async function getAttempts() {
  const res = await axios.get('http://' + process.env.SERVERDOM + ':3001/api/evaluations/admin');
  return res.data;
}
