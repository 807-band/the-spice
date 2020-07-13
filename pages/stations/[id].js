import { getAllStationIds, getStationData }  from '../../lib/stations'
import Head from 'next/head'
import Link from 'next/link'

export default function Station({ stationData }) {
   return (
      <>
         <Head>
            <title>{ stationData.title }</title>
         </Head>
         <h1>
            Title: { stationData.title }
         </h1>
            id: { stationData.id }
         <br />
      </>
   )
}

export async function getServerSideProps({ params }) {
  const stationData = await getStationData(params.id)
  return {
    props: {
      stationData
    }
  }
}
