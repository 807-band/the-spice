import { getStationData } from '../../lib/stations'
import StationInfoJumbo from '../../components/StationInfoJumbo'
import StationInfo from '../../components/StationInfoLinks'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Link from 'next/link'
import { Button } from 'react-bootstrap'

export default function Station({ stationData, permissions }) {
   if (!permissions.includes('admin'))
      return (
         <>
            <StationInfoJumbo stationData={stationData} edit="false" />
            <StationInfo id={stationData.sID} />
            <GroupingCards data={stationData.groups} />
            <br />
         </>
      )
   return (
      <>
         <Link href="/stations/[id]/edit" as={`/stations/${stationData.sID}/edit`}>
            <Button variant="primary" className="edit-station-button">
               Edit
            </Button>
         </Link>

         <StationInfoJumbo stationData={stationData} edit="false" />

         <StationInfo id={stationData.sID} />

         <GroupingCards data={stationData.groups} />
         <br />
      </>
   )
}

function GroupList(items) {
   items.sort((a, b) => (a.level > b.level) ? 1 : -1);

   return items.map((i) =>
      <ListGroup.Item key={i.itemID} className={i.required ? "required" : ""}>
         {i.item}
      </ListGroup.Item>
   );
}

function GroupingCards(props) {
   const groupings = [];
   props.data.forEach((groups) => {
      groupings.push(groups);
   });

   groupings.sort((a, b) => (a.level > b.level) ? 1 : -1);

   const groupCards = groupings.map((g) =>
      <Card key={g.groupID}>
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
