import { getStationData } from "../../../lib/stations";
import { submitEvaluation } from "../../../lib/evaluations"
import { getUser } from "../../../lib/users"
import { Form, Card, ListGroup, Button } from "react-bootstrap"
import { withRouter } from 'next/router'

class EvaluateUserStation extends React.Component {
   constructor(props) {
      super(props);
      const switchMap = {};
      for (var i = 0; i < props.station.groups.length; i++) {
         for (var j = 0; j < props.station.groups[i].items.length; j++) {
            switchMap[props.station.groups[i].items[j].itemID] = false;
         }
      }

      this.state = {
         switchMap: switchMap
      }
   }

   render() {
      return (
         <>
            <h1>
               {this.props.user.name}
            </h1>
            <this.EvaluationForm />
         </>
      );
   }

   EvaluationForm = () => {
      return (
         <Form onSubmit={this.onSubmitEvaluation}>
            {this.props.station.groups.map((group) => (
               <Card key={group.groupID}>
                  <Card.Header>{group.title}</Card.Header>
                  <ListGroup>
                     {group.items.map((item) => (
                        <ListGroup.Item key={item.itemID}>
                           <Form.Group controlId={item.itemID}>
                              <Form.Switch onChange={this.changeSwitch(item.itemID)} id={item.itemID} label={item.item} />
                           </Form.Group>
                        </ListGroup.Item>
                     ))}
                  </ListGroup>
               </Card>
            ))}
            <br />
            <Button className="edit-button" type="submit">
               Submit Evaluation
            </Button>
         </Form>
      );
   }

   changeSwitch = (id) => () => {
      const switchMap = this.state.switchMap;
      switchMap[id] = !switchMap[id];
      this.setState({switchMap: switchMap});
   }

   onSubmitEvaluation = async (event) => {
      event.preventDefault();
      // TODO: once we have user auth, the second userID will be the evaluatorID
      // for now, the user evaluates themselves ;)
      await submitEvaluation(this.props.user.userID, this.props.station.sID, this.props.user.userID, this.state.switchMap, this.props.station.maxFailed);
      this.props.router.push("/evaluate/[uID]", `/evaluate/${this.props.user.userID}`);
   }
}

export async function getServerSideProps({ params }) {
   const user = await getUser(params.uID);
   const station = await getStationData(params.sID);
   return {
      props: {
         user,
         station
      }
   }
}

export default withRouter(EvaluateUserStation);