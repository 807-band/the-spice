import { Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/modules/MemberOverview.module.scss'

export default function MemberOverview(props) {
  return (
    <>
      <StationHead stations={props.stations} />
      <MemberAttempts users={props.users} />
    </>
  );
}

function StationHead(props) {
  return (
    <>
      <Row className={styles.stationHeaders}>
        <Col xs={3}></Col>
        <Col className={styles.headerColor+' '+styles.cellpad}>Beginner</Col>
        <Col className={styles.headerColor+' '+styles.cellpad}>Advanced</Col>
      </Row>
      <Row className={styles.stationHeaders}>
        <Col xs={3}></Col>
        <StationBoxes level='0' stationData={props.stations} />
        <StationBoxes level='1' stationData={props.stations} />
      </Row>
    </>
  );
}

function StationBoxes(props) {
  const stations = props.stationData.filter(station => station.class == props.level);
  const stationTag = stations.map(station => {
    return (
      <Col title={station.title} className={styles.stationColor}>
        {station.level}
      </Col>
    )
  });

  return <>{stationTag}</>
}

function MemberAttempts(props) {
  let sectionSorted = {};

  props.users.forEach(user => {
    let section = user.section;
    let member = user.name;

    if (sectionSorted[section] === undefined)
      sectionSorted[section] = {};
    if (sectionSorted[section][member] === undefined)
      sectionSorted[section][member] = [];

    sectionSorted[section][member].push(user);
  });

  let sectionInfo = [];

  for (let section in sectionSorted) {
    sectionInfo.push(
      <>
        <Row className={styles.sectionHead}>
          <Col className={styles.headerColor} xs={3}>{section}</Col>
        </Row>
        <Members members={sectionSorted[section]} />
      </>
    )
  }

  return <>{sectionInfo}</>;
}

function Members(props) {
  let members = [];

  for (let name in props.members) {
    let member = props.members[name];
    console.log(member);
    members.push(
      <Row key={member.userID}>
        <Col xs={3} className={styles.nameColor}>{name}</Col>
        <Attempts attempts={member} />
      </Row>
    );
  }

  return <>{members}</>
}

function Attempts(props) {
  const stations = props.attempts.map(attempt => {
    let statusClass = styles.attempt + " " + styles.cellpad + " ";
    let mark = null;

    if (attempt.passed === 1) {
      statusClass += styles.completed;
      mark = "\u2713"
    } else if (attempt.attempts > 0) {
      statusClass += styles.attempted;
      mark = "\u2573"
    } else {
      statusClass += styles.no_attempts;
      mark = "\u20E0"
    }

    const moreInfo = "Evaluated by: " + attempt.evaluator
      + "\nEvaluated at: " + attempt.evalTime;
    return (
      <Col className={statusClass} title={moreInfo}>
        {mark}
      </Col>
    )
  });

  return <>{stations}</>;
}
