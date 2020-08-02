import { getStationData } from '../../lib/stations'
import StationInfoJumbo from '../../components/StationInfoJumbo'
import StationInfo from '../../components/StationInfo'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'

export default function Station({ stationData }) {
   return (
      <>
         <StationInfoJumbo
            stationData={stationData}
            buttonTo="/stations/[id]/edit"
            as={`/stations/${stationData.id}/edit`}
            buttonText="Edit"
         />

         <StationInfo id={stationData.id}/>

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
