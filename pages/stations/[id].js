import { getAllStationIds, getStationData }  from '../../lib/stations'
import Link from 'next/link'

export default function Station({ stationData }) {
   return (
      <>
         <h1>
            Title: { stationData.title }
         </h1>
         <body>
            id: { stationData.id }
         </body>
         <br />
          <Link href="/">
             <a>Back to home</a>
          </Link>
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
