import Head from 'next/head'
import { getStations } from '../lib/stations'

export default function Home({ allStationsData }) {
   return (
      <>  
         <Head>
            <title>807.band</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main>
            <h1>
               Hello World
            </h1>
            <br />
            <br />
            <body>   
               <b>STATIONS: </b>
               <br />
               <br />
               { allStationsData.map(({id, title}) => (
                  <li>
                     {id}
                     <br />
                     {title}
                     <br />
                     <br />
                  </li>
               ))}
               <br />
               <br />
               raw json at /api/cors
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
