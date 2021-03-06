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

export async function getPermissions(uID) {
   const res = await axios.get('http://' + process.env.SERVERDOM + ':3001/api/user/' + uID + '/permissions');
   return res.data;
}

export async function login(username, password) {
   const res = await axios.post('http://' + process.env.SERVERDOM + ':3001/api/user/login', {
      username: username,
      password: password,
      withCredentials: true,
   });
   return res.data;
}

export async function logout() {
   await axios.get('http://' + process.env.SERVERDOM + ':3001/api/user/auth/logout');
}

export async function changePassword(userID, password) {
   await axios.post('http://' + process.env.SERVERDOM + ':3001/api/user/password', {
      password: password,
      userID: userID
   });
}
