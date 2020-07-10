import Head from 'next/head'
import Link from 'next/link'
import { getStations } from '../lib/stations'

export default function Home({ allStationsData }) {
   return (
      <>  
         <Head>
            <title>807.band</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main>
            <body>   
               <b>STATIONS: </b>
               <br />
               <br />
               { allStationsData.map(({id, title}) => (
                  <li key={id}>
                     <Link href="/stations/[id]" as={`/stations/${id}`}>
                        <a>{title}</a>
                     </Link>
                  </li>
               ))}
            </body>
         </main>
      </>
   )
}

export async function getStaticProps() {
  const allStationsData = await getStations()
  return {
    props: {
      allStationsData
    }
  }
}
