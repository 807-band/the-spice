import Head from 'next/head'
import Link from 'next/link'
import { getStations } from '../lib/stations'

export default function Home({ allStationsData }) {
   return (
      <>  
         <Head>
            <title>807.band</title>
         </Head>
         <b>STATIONS: </b>
         <br />
         <br />
         <ul>
         { allStationsData.map(({id, title}) => (
            <li key={id}>
               <Link href="/stations/[id]" as={`/stations/${id}`}>
                  <a>{title}</a>
               </Link>
            </li>
         ))}
         </ul>
      </>
   )
}

export async function getServerSideProps() {
  const allStationsData = await getStations()
  return {
    props: {
      allStationsData
    }
  }
}
