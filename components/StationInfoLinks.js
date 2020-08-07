import Container from 'react-bootstrap/Container'
import Link from 'next/link'
import { Col, Row } from 'react-bootstrap'

class StationInfo extends React.Component {
   render() {
      return (
         <>
            <h3>Station Information</h3>
            <Container >
               <Row>
                  <Col>
                     <Link href="/stations/[id]/instructor/setup" as={`/stations/${this.props.id}/instructor/setup`}>
                        <a>Instructor Setup</a>
                     </Link>
                  </Col>
                  <Col>
                     <Link href="/stations/[id]/instructor/script" as={`/stations/${this.props.id}/instructor/script`}>
                        <a>Instructor Script</a>
                     </Link>
                  </Col>
               </Row>
               <Row>
                  <Col>
                     <Link href="/stations/[id]/evaluator/setup" as={`/stations/${this.props.id}/evaluator/setup`}>
                        <a>Evaluator Setup</a>
                     </Link>
                  </Col>
                  <Col>
                     <Link href="/stations/[id]/evaluator/script" as={`/stations/${this.props.id}/evaluator/script`}>
                        <a>Evaluator Script</a>
                     </Link>
                  </Col>
               </Row>
            </Container>
         </>
      );
   }
}

export default StationInfo;