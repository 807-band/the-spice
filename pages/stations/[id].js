import { getAllStationIds, getStationData } from '../../lib/stations'
import Head from 'next/head'
import Link from 'next/link'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import { Col, Row, Button } from 'react-bootstrap'

export default function Station({ stationData }) {
   return (
      <>
         <Head>
            <title>{stationData.title} - 807.band</title>
         </Head>
         <h1>
            {stationData.title}
            <Link href={"/stations/" + stationData.id + "/edit"}>
               <Button variant="primary" className="edit-button">
                  Edit
               </Button>
            </Link>
         </h1>
         <div className="description">{stationData.description}</div>
         <div className="maxMissed">Maximum failed: {stationData.maxFailed}</div>

         <h3>Station Information</h3>
         <Container >
            <Row>
               <Col>
                  Instructor Setup
               </Col>
               <Col>
                  Instructor Script
               </Col>
            </Row>
            <Row>
               <Col>
                  Evaluator Setup
               </Col>
               <Col>
                  Evaluator Script
               </Col>
            </Row>
         </Container>

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
