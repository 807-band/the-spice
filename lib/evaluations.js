import axios from 'axios'

export async function getUserProgress(uID) {
   const res = await axios.get('http://' + process.env.SERVERDOM + ':3001/api/evaluations/u/' + uID);
   return res.data;
}

export async function getUserNextStation(uID) {
   const res = await axios.get('http://' + process.env.SERVERDOM + ':3001/api/evaluations/u/' + uID + '/next');
   return res.data;
}

export async function submitEvaluation(userID, stationID, evaluatorID, itemMap, maxFailed) {
   const res = await axios.post('http://' + process.env.SERVERDOM + ':3001/api/evaluations/' + userID + '/' + stationID, {
      evaluatorid: evaluatorID,
      itemMap: itemMap,
      maxFailed: maxFailed
   });
   return res.data;
}