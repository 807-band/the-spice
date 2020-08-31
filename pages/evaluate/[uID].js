import { getUserProgress, getUserNextStation } from '../../lib/evaluations'
import { getUser } from '../../lib/users'
import { ListGroup, Card } from 'react-bootstrap'
import Link from 'next/link'

export default function EvaluateUser({ stationProgress, nextStation, user }) {
   return (
      <>
         <h1>
            Evaluate {user.name}
         </h1>
         <StationCards data={stationProgress} nextStation={nextStation} uID={user.userID} />
      </>
   );
}

function StationCards(props) {
   const beginnerStations = props.data.filter(station => station.class == 0);
   const advancedStations = props.data.filter(station => station.class == 1);

   const beginnerList = beginnerStations.map((s, index) =>
      <Link href="/evaluate/[uID]/[sID]" as={`/evaluate/${props.uID}/${s.sID}`} key={s.sID}>
         <ListGroup.Item className={s.passed ? "card-item-passed" : s.passed == 0 ? "card-item-failed" : "card-item"} as="button">
            {"Station " + (index + 1) + ": " + s.title}
            <Status station={s} nextStation={props.nextStation}/>
         </ListGroup.Item>
      </Link>
   );

   const advancedList = advancedStations.map((s, index) =>
      <Link href="/evaluate/[uID]/[sID]" as={`/evaluate/${props.uID}/${s.sID}`} key={s.sID}>
         <ListGroup.Item className={s.passed ? "card-item-passed" : s.passed == 0 ? "card-item-failed" : "card-item"} as="button">
            {"Station " + (index + 1) + ": " + s.title}
            <Status station={s} nextStation={props.nextStation}/>
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

function Status(props) {
   if(props.station.sID == props.nextStation.sID)
      return(
         <div className="status">Status: ready for evaluation</div>
      );
   else if(props.station.passed)
      return(
         <div className="status">Status: passed</div>
      );
   else
      return(
         <div className="status">Status: evaluate "Station {props.nextStation.level + 1}: {props.nextStation.title}" first</div>
      );
}

export async function getServerSideProps({ params }) {
   const uID = params.uID;
   const stationProgress = await getUserProgress(uID);
   const nextStation = await getUserNextStation(uID);
   const user = await getUser(uID);
   return {
      props: {
         stationProgress,
         nextStation,
         user
      }
   }
}
