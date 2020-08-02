import { getStationData, postGrouping, postItem, deleteGrouping, deleteItem, deleteStation } from '../../../lib/stations'
import StationInfoJumbo from '../../../components/StationInfoJumbo'
import StationInfo from '../../../components/StationInfo'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import { Row, Col, Button, Form, Modal } from 'react-bootstrap'

export default class Edit extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         addingGrouping: false,
         addItemTo: null,
         groupings: this.props.stationData.groupings,
         showModal: null,
         showDeleteStationModal: false,
         requiredClicked: false
      }
   }

   render() {
      return (
         <>
            <StationInfoJumbo
               stationData={this.props.stationData}
               buttonTo="/stations/[id]"
               as={`/stations/${this.props.stationData.id}`}
               buttonText="Done"
            />

            <StationInfo id={this.props.stationData.id} />

            <GroupingCards
               data={this.state.groupings}
               addItemTo={this.state.addItemTo}
               updateCurrentGrouping={this.updateCurrentGrouping}
               onSubmit={this.onSubmitItem}
               deleteGrouping={this.deleteGrouping}
               deleteItem={this.deleteItem}
               showModal={this.state.showModal}
               updateShowModal={this.updateShowModal}
               clickRequiredCheckbox={this.clickRequiredCheckbox}
            />
            <br />
            <AddGrouping show={this.state.addingGrouping} switchAddingState={this.switchAddingStateGroupings} onSubmit={this.onSubmitGrouping} />
            <br /><br /><br />
            <Button variant="danger" className="edit-button" onClick={this.switchShowDeleteStationModal}>
               Delete Station
            </Button>
            <Modal show={this.state.showDeleteStationModal} onHide={this.switchShowDeleteStationModal}>
               <Modal.Header className="danger-modal-header"><Modal.Title>WARNING: Are you sure you want to delete {this.props.stationData.title}?</Modal.Title></Modal.Header>
               <Modal.Body>All its groupings and items will be deleted with it. THIS IS FINAL.</Modal.Body>
               <Modal.Footer>
                  <Button onClick={this.switchShowDeleteStationModal}>
                     Cancel
                  </Button>
                  <Button variant="danger" href="/stations" onClick={this.deleteStation}>
                     Yes, I'm sure
                  </Button>
               </Modal.Footer>
            </Modal>
         </>
      )
   }

   deleteStation = async () => {
      await deleteStation(this.props.stationData.id);
   }

   clickRequiredCheckbox = () => {
      this.setState({ requiredClicked: !this.state.requiredClicked });
   }

   switchShowDeleteStationModal = () => {
      this.setState({ showDeleteStationModal: !this.state.showDeleteStationModal });
   }

   updateShowModal = grouping => () => {
      this.setState({ showModal: grouping });
   }

   updateCurrentGrouping = (grouping, resetBox) => () => {
      if (resetBox) this.setState({ requiredClicked: false });
      this.setState({ addItemTo: grouping });
   }

   switchAddingStateGroupings = () => {
      this.setState({ addingGrouping: !this.state.addingGrouping });
   }

   onSubmitGrouping = async (event) => {
      event.preventDefault();
      const res = await postGrouping(this.props.stationData.id, event.currentTarget.title.value);
      const groupings = this.state.groupings;
      groupings.push(res.data);
      this.setState({ groupings: groupings });
   }

   onSubmitItem = async (event) => {
      event.preventDefault();
      const res = await postItem(this.props.stationData.id, this.state.addItemTo.id, event.currentTarget.title.value, this.state.requiredClicked);
      this.setState({ groupings: res.data.groupings });
   }

   deleteGrouping = grouping => async () => {
      await deleteGrouping(this.props.stationData.id, grouping.id);
      const groupings = this.state.groupings;
      groupings.splice(grouping.order, 1);
      groupings.forEach((grouping, index) => {
         grouping.order = index;
      });
      this.setState({ groupings: groupings, showModal: false });
   }

   deleteItem = (grouping, item) => async () => {
      await deleteItem(this.props.stationData.id, grouping.id, item.id);
      const groupings = this.state.groupings;
      groupings[grouping.order].items.splice(item.order, 1);
      groupings[grouping.order].items.forEach((item, index) => {
         item.order = index;
      });
      this.setState({ groupings: groupings });
   }
}

function AddGrouping(props) {
   if (!props.show)
      return (
         <Button className="edit-button" onClick={props.switchAddingState}>
            Add Grouping
         </Button>
      )
   return (
      <Form onSubmit={props.onSubmit}>
         <Form.Group controlId="title">
            <Card>
               <Card.Header className="card-header">
                  <Form.Control type="text" placeholder="Grouping Name" />
               </Card.Header>
            </Card>
         </Form.Group>
         <Button variant="primary" type="submit" className="edit-button">
            Add
         </Button>
         <Button variant="secondary" className="edit-button" onClick={props.switchAddingState}>
            Back
         </Button>
      </Form>
   );
}

function GroupList(props) {
   props.grouping.items.sort((a, b) => (a.order > b.order) ? 1 : -1);
   const groupItems = props.grouping.items.map((i) =>
      <ListGroup.Item key={i.id} className={i.isRequired ? "required" : ""}>
         {i.title}
         <Button variant="outline-danger" className="edit-button" onClick={props.deleteItem(props.grouping, i)}>
            Delete
         </Button>
      </ListGroup.Item>
   );

   return (
      <>
         {groupItems}
         <AddItem key="add-item" addItemTo={props.addItemTo} updateCurrentGrouping={props.updateCurrentGrouping} onSubmit={props.onSubmit} grouping={props.grouping} clickRequiredCheckbox={props.clickRequiredCheckbox} />
      </>
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
         <Card.Header className="card-header">
            {g.title}
            <Button variant="danger" className="edit-button" onClick={props.updateShowModal(g.id)}>
               Delete
            </Button>
         </Card.Header>
         <ListGroup>
            <GroupList grouping={g} addItemTo={props.addItemTo} updateCurrentGrouping={props.updateCurrentGrouping} onSubmit={props.onSubmit} deleteItem={props.deleteItem} clickRequiredCheckbox={props.clickRequiredCheckbox} />
         </ListGroup>
         <Modal show={props.showModal == g.id} onHide={props.updateShowModal(null)}>
            <Modal.Header className="card-header"><Modal.Title>Are you sure you want to delete {g.title}?</Modal.Title></Modal.Header>
            <Modal.Body>All its items will be deleted with it.</Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={props.updateShowModal(null)}>
                  Cancel
               </Button>
               <Button variant="danger" onClick={props.deleteGrouping(g)}>
                  Yes, I'm sure
               </Button>
            </Modal.Footer>
         </Modal>
      </Card>
   );

   return <>{groupCards}</>;
}

function AddItem(props) {
   if (props.addItemTo == null || props.addItemTo.id != props.grouping.id)
      return (
         <Button variant="light" onClick={props.updateCurrentGrouping(props.grouping, true)}>
            Add Item
         </Button>
      )
   return (
      <Form onSubmit={props.onSubmit}>
         <ListGroup.Item>
            <Row>
               <Col xs={10}><Form.Control type="text" placeholder="Item Name" id="title" /></Col>
               <Col><Form.Check label="required" onClick={props.clickRequiredCheckbox} /></Col>
            </Row>
         </ListGroup.Item>
         <Button variant="primary" type="submit" className="edit-button">
            Add
         </Button>
         <Button variant="secondary" className="edit-button" onClick={props.updateCurrentGrouping(null, false)}>
            Back
         </Button>
      </Form>
   );
}

export async function getServerSideProps({ params }) {
   const stationData = await getStationData(params.id);
   return {
      props: {
         stationData
      }
   }
}