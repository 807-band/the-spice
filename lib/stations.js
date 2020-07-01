import fetch from 'node-fetch'

export async function getStations() {
  const res = await fetch('http://ec2-52-42-80-173.us-west-2.compute.amazonaws.com:3001/api/station')
  return res.json()
}
