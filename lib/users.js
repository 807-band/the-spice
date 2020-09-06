import axios from 'axios'

axios.defaults.withCredentials = true;

export async function getUsers() {
   const res = await axios.get('http://' + process.env.SERVERDOM + ':3001/api/user');
   return res.data;
}

export async function getUser(uID) {
   const res = await axios.get('http://' + process.env.SERVERDOM + ':3001/api/user/' + uID);
   return res.data;
}

export async function login(username, password) {
   const res = await axios.post('http://localhost:3001/login', {
      username: username,
      password: password,
      withCredentials: true,
   });
   return res.data;
}

export async function getCurrentUser(usersession) {
   const res = await axios.get('http://localhost:3001/login', {
      withCredentials: true,
      usersession: usersession
   });
   return res.data;
}