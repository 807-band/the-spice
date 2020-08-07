import { getStationData } from '../../lib/stations'
import StationInfoJumbo from '../../components/StationInfoJumbo'
import StationInfo from '../../components/StationInfoLinks'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Link from 'next/link'
import { Button } from 'react-bootstrap'

export default function Station({ stationData }) {
   return (
      <>
         <Link href="/stations/[id]/edit" as={`/stations/${stationData.id}/edit`}>
            <Button variant="primary" className="edit-station-button">
               Edit
            </Button>
         </Link>

         <StationInfoJumbo stationData={stationData} edit="false" />

         <StationInfo id={stationData.id} />

         <GroupingCards data={stationData.groupings} />
         <br />
      </>
   )
}

function GroupList(items) {
   items.sort((a, b) => (a.order > b.order) ? 1 : -1);

   return items.map((i) =>
      <ListGroup.Item key={i.id} className={i.isRequired ? "required" : ""}>
         {i.title}
      </ListGroup.Item>
   );
}

function GroupingCards(props) {
   const groupings = [];
   props.data.forEach((groups) => {
      groupings.push(groups);
   });

   groupings.sort((a, b) => (a.order > b.order) ? 1 : -1);

   const groupCards = groupings.map((g) =>
      <Card key={g.id}>
         <Card.Header className="card-header">{g.title}</Card.Header>
         <ListGroup>
            {GroupList(g.items)}
         </ListGroup>
      </Card>
   );

   return <>{groupCards}</>;
}

export async function getServerSideProps({ params }) {
   const stationData = await getStationData(params.id);
   return {
      props: {
         stationData
      }
   }
}
