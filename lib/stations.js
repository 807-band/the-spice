import fetch from 'node-fetch'

export async function getStations() {
  const res = await fetch('http://localhost:3001/api/station')
  return res.json()
}
