import Head from 'next/head'
import Link from 'next/link'
import { getStations } from '../lib/stations'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'

export default function Stations({ allStationsData }) {
   return (
      <>  
         <Head>
            <title>807.band</title>
         </Head>
         <h1>
            Stations
         </h1>
         
        <StationCards data={ allStationsData }/> 
      </>
   )
}

function StationCards(props) {
   const beginnerStations = [], advancedStations = [];
   props.data.forEach((station) => {
      if(station.rank == "beginner")
         beginnerStations.push(station);
      else if(station.rank == "advanced")
         advancedStations.push(station);
   });
   
   beginnerStations.sort((a, b) => (a.order > b.order) ? 1 : -1);
   advancedStations.sort((a, b) => (a.order > b.order) ? 1 : -1);
   
   const beginnerList = beginnerStations.map((s, index) =>
      <ListGroup.Item key={ s.id } action href={ "/stations/" + s.id }>
         Station { s.order }: { s.title }
      </ListGroup.Item>
   );

   const advancedList = advancedStations.map((s) =>
      <ListGroup.Item key={ s.id } action href={ "/stations/" + s.id }>
         Station { s.order }: { s.title }
      </ListGroup.Item>
   );

   return(
      <>
         <Card>
            <Card.Header className="card-header" text="white">Beginner</Card.Header>
            <ListGroup variant="flush">
               { beginnerList }
            </ListGroup>
         </Card>
         <br />
         <Card>
            <Card.Header>Advanced</Card.Header>
            <ListGroup>
               { advancedList }
            </ListGroup>
         </Card>
      </>
   );
}

export async function getServerSideProps() {
   const allStationsData = await getStations()
   return {
      props: {
         allStationsData
      }
   }
}
