import { getStationData, postGrouping, postItem, 
   deleteGrouping, deleteItem, deleteStation, 
   putGrouping, putItem } from '../../../lib/stations'
import StationInfoJumbo from '../../../components/StationInfoJumbo'
import StationInfo from '../../../components/StationInfoLinks'
import ListGroup from 'react-bootstrap/ListGroup'
import { Row, Col, Button, Form, Modal, Card } from 'react-bootstrap'
import Link from 'next/link'
import Router from 'next/router'

export default class Edit extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         addingGrouping: false,
         addItemTo: null,
         groupings: this.props.stationData.groups,
         showModal: null,
         showDeleteStationModal: false,
         requiredClicked: false,
         editRequiredClicked: false,
         groupingTitleChange: null,
         itemChange: null
      }
   }

   render() {
      return (
         <>
            <Link href="/stations/[id]" as={`/stations/${this.props.stationData.sID}`}>
               <Button variant="primary" type="submit" className="edit-station-button">
                  Done
               </Button>
            </Link>

            <StationInfoJumbo stationData={this.props.stationData} edit="true" />

            <StationInfo id={this.props.stationData.id} />

            {<this.GroupingCards />}

            <br />

            <this.AddGrouping />

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
                  <Button variant="danger" onClick={this.deleteStation}>
                     Yes, I'm sure
                  </Button>
               </Modal.Footer>
            </Modal>
         </>
      )
   }

   groupingTitle = (g) => {
      if (this.state.groupingTitleChange != g.groupID)
         return (
            <>
               {g.title}
               <Button variant="danger" className="edit-button" onClick={this.updateShowModal(g.groupID)}>
                  Delete
               </Button>
               <Button className="edit-button" onClick={() => this.setState({ groupingTitleChange: g.groupID })}>
                  Edit Title
               </Button>
            </>
         );
      else
         return (
            <Form onSubmit={this.onSubmitGroupingTitle(g)}>
               <Form.Control type="text" defaultValue={g.title} id="title" />
               <Button variant="primary" type="submit" className="edit-button">
                  Save
               </Button>
               <Button variant="secondary" className="edit-button" onClick={() => this.setState({ groupingTitleChange: null })}>
                  Back
               </Button>
            </Form>
         );
   }

   GroupingCards = () => {
      const groupings = [];
      this.state.groupings.forEach((groups) => {
         groupings.push(groups);
      });

      const groupCards = groupings.map((g) =>
         <Card key={g.groupID}>
            <Card.Header className="card-header">
               {this.groupingTitle(g)}
            </Card.Header>
            <ListGroup>
               {this.GroupList(g)}
            </ListGroup>
            <Modal show={this.state.showModal == g.groupID} onHide={this.updateShowModal(null)}>
               <Modal.Header className="card-header"><Modal.Title>Are you sure you want to delete {g.title}?</Modal.Title></Modal.Header>
               <Modal.Body>All its items will be deleted with it.</Modal.Body>
               <Modal.Footer>
                  <Button variant="secondary" onClick={this.updateShowModal(null)}>
                     Cancel
                  </Button>
                  <Button variant="danger" onClick={this.deleteGrouping(g)}>
                     Yes, I'm sure
                  </Button>
               </Modal.Footer>
            </Modal>
         </Card>
      );

      return <>{groupCards}</>;
   }

   GroupList = (grouping) => {
      const groupItems = grouping.items.map((i) =>
         <div key={i.itemID}>{this.Item(grouping, i)}</div>
      );

      return (
         <>
            {groupItems}
            {this.AddItem(grouping)}
         </>
      );
   }

   Item = (grouping, i) => {
      if (this.state.itemChange != i.itemID)
         return (
            <ListGroup.Item key={i.itemID} className={i.required ? "required" : ""}>
               {i.item}
               <Button variant="outline-danger" className="edit-button" onClick={this.deleteItem(grouping, i)}>
                  Delete
               </Button>
               <Button variant="outline-primary" className="edit-button" onClick={() => this.setState({ itemChange: i.itemID })}>
                  Edit Item
               </Button>
            </ListGroup.Item>
         );
      else
         return (
            <Form onSubmit={this.onUpdateItem(grouping, i)}>
               <ListGroup.Item>
                  <Row>
                     <Col xs={10}><Form.Control type="text" defaultValue={i.item} id="title" /></Col>
                     <Col><Form.Check label="required" onClick={() => this.setState({ editRequiredClicked: !this.state.editRequiredClicked })} /></Col>
                  </Row>
               </ListGroup.Item>
               <Button variant="primary" type="submit" className="edit-button">
                  Save
               </Button>
               <Button variant="secondary" className="edit-button" onClick={() => this.setState({ itemChange: null, editRequiredClicked: false })}>
                  Back
               </Button>
            </Form>
         );
   }

   AddGrouping = () => {
      if (!this.state.addingGrouping)
         return (
            <Button className="edit-button" onClick={this.switchAddingStateGroupings}>
               Add Grouping
            </Button>
         )
      return (
         <Form onSubmit={this.onSubmitGrouping}>
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
            <Button variant="secondary" className="edit-button" onClick={this.switchAddingStateGroupings}>
               Back
            </Button>
         </Form>
      );
   }

   AddItem = (grouping) => {
      if (this.state.addItemTo == null || this.state.addItemTo.groupID != grouping.groupID)
         return (
            <Button variant="light" onClick={this.updateCurrentGrouping(grouping, true)}>
               Add Item
            </Button>
         )
      return (
         <Form onSubmit={this.onSubmitItem}>
            <ListGroup.Item>
               <Row>
                  <Col xs={10}><Form.Control type="text" placeholder="Item Name" id="title" /></Col>
                  <Col><Form.Check label="required" onClick={this.clickRequiredCheckbox} /></Col>
               </Row>
            </ListGroup.Item>
            <Button variant="primary" type="submit" className="edit-button">
               Add
            </Button>
            <Button variant="secondary" className="edit-button" onClick={this.updateCurrentGrouping(null, false)}>
               Back
            </Button>
         </Form>
      );
   }

   onSubmitGroupingTitle = grouping => async (event) => {
      event.preventDefault();
      const title = event.currentTarget.title.value;
      const res = await putGrouping(this.props.stationData.sID, grouping.groupID, title);
      const groupings = this.state.groupings;
      groupings[grouping.level].title = title;
      this.setState({ groupingTitleChange: null, groupings: groupings });
   }

   deleteStation = async (event) => {
      await deleteStation(this.props.stationData.sID);
      Router.push('/stations');
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
      await postGrouping(this.props.stationData.sID, event.currentTarget.title.value);
      const stationData = await getStationData(this.props.stationData.sID);
      this.setState({ groupings: stationData.groups });
   }

   onSubmitItem = async (event) => {
      event.preventDefault();
      await postItem(this.props.stationData.sID, this.state.addItemTo.groupID, event.currentTarget.title.value, this.state.requiredClicked);
      const stationData = await getStationData(this.props.stationData.sID);
      this.setState({ groupings: stationData.groups });
   }

   onUpdateItem = (grouping, item) => async (event) => {
      event.preventDefault();
      const groupings = this.state.groupings;
      groupings[grouping.level].items[item.level].item = event.currentTarget.title.value;
      groupings[grouping.level].items[item.level].required = this.state.editRequiredClicked ? 1 : 0;
      await putItem(this.props.stationData.sID, grouping.groupID, item.itemID, event.currentTarget.title.value, this.state.editRequiredClicked ? 1 : 0);
      this.setState({ itemChange: null, editRequiredClicked: false, groupings: groupings });
   }

   deleteGrouping = grouping => async () => {
      await deleteGrouping(this.props.stationData.sID, grouping.groupID);
      const stationData = await getStationData(this.props.stationData.sID);
      this.setState({ groupings: stationData.groups, showModal: false });
   }

   deleteItem = (grouping, item) => async () => {
      await deleteItem(this.props.stationData.sID, grouping.groupID, item.itemID);
      const stationData = await getStationData(this.props.stationData.sID);
      this.setState({ groupings: stationData.groups });
   }
}

export async function getServerSideProps({ params }) {
   const stationData = await getStationData(params.id);
   return {
      props: {
         stationData
      }
   }
}
