import Head from 'next/head'
import Link from 'next/link'
import { getStations } from '../lib/stations'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function Stations({ allStationsData }) {
   return (
      <>
         <Head>
            <title>807.band</title>
         </Head>
         <h1>
            Stations
            <Link href="/stations/edit">
               <Button variant="primary" className="edit-button">
                  Edit Order
               </Button>
            </Link>
         </h1>

         <StationCards data={allStationsData} />
      </>
   )
}

function StationCards(props) {
   const beginnerStations = props.data.filter(station => station.class == 0);
   const advancedStations = props.data.filter(station => station.class == 1);

   const beginnerList = beginnerStations.map((s, index) =>
      <Link href="/stations/[id]" as={`/stations/${s.sID}`} key={s.sID}>
         <ListGroup.Item className="card-item" as="button">
            {"Station " + (index + 1) + ": " + s.title}
         </ListGroup.Item>
      </Link>
   );

   const advancedList = advancedStations.map((s, index) =>
      <Link href="/stations/[id]" as={`/stations/${s.sID}`} key={s.sID}>
         <ListGroup.Item className="card-item" as="button">
            {"Station " + (index + 1) + ": " + s.title}
         </ListGroup.Item>
      </Link>
   );

   return (
      <>
         <Card>
            <Card.Header>Beginner</Card.Header>
            <ListGroup>
               {beginnerList}
            </ListGroup>
         </Card>
         <br />
         <Card>
            <Card.Header>Advanced</Card.Header>
            <ListGroup>
               {advancedList}
            </ListGroup>
         </Card>
      </>
   );
}

export async function getServerSideProps() {
   const allStationsData = await getStations();
   return {
      props: {
         allStationsData
      }
   }
}