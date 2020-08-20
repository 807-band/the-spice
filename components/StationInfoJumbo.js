import Head from 'next/head'
import { Button, Jumbotron, Form } from 'react-bootstrap'
import { putStation } from '../lib/stations'

class StationInfoJumbo extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         editing: false,
         stationData: props.stationData
      }
   }

   render() {
      return (
         <>
            <Jumbotron className="station-jumbo">
               <Head>
                  <title>{this.state.stationData.title} - 807.band</title>
               </Head>
               <this.StationInfo />
            </Jumbotron>
         </>
      );
   }

   StationInfo = () => {
      if (this.props.edit === "true") {
         if (!this.state.editing)
            return (
               <>
                  <Button className="edit-station-data" onClick={() => this.setState({ editing: true })}>
                     Edit Station Data
                  </Button>
                  <h1 className="station-title">
                     {this.state.stationData.title}
                  </h1>
                  <br />
                  <div className="description">{this.state.stationData.description}</div>
                  <br />
                  <div className="maxMissed">Maximum failed: {this.state.stationData.maxFailed}</div>
               </>
            );
         else
            return (
               <>
                  <Button variant="secondary" className="edit-station-data" onClick={() => this.setState({ editing: false })}>
                     Back
                  </Button>
                  <br />
                  <Form onSubmit={this.submitChanges}>
                     <Form.Group>
                        <Form.Label>Station Title</Form.Label>
                        <Form.Control type="text" defaultValue={this.state.stationData.title} id="title" />
                     </Form.Group>
                     <br />
                     <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" defaultValue={this.state.stationData.description} id="description" />
                     </Form.Group>
                     <br />
                     <Form.Group>
                        <Form.Label>Maximum Failed</Form.Label>
                        <Form.Control type="number" defaultValue={this.state.stationData.maxFailed} id="maxFailed" />
                     </Form.Group>
                     <br />
                     <Button type="submit" className="edit-button">
                        Save
                     </Button>
                  </Form>
               </>
            )
      }
      return (
         <>
            <h1 className="station-title">
               {this.state.stationData.title}
            </h1>
            <br />
            <div className="description">{this.state.stationData.description}</div>
            <br />
            <div className="maxMissed">Maximum failed: {this.state.stationData.maxFailed}</div>
         </>
      );
   }

   submitChanges = async (event) => {
      event.preventDefault();
      const newStationData = this.state.stationData;
      newStationData.title = event.currentTarget.title.value;
      newStationData.description = event.currentTarget.description.value;
      newStationData.maxFailed = event.currentTarget.maxFailed.value;
      await putStation(this.state.stationData.sID, event.currentTarget.title.value, event.currentTarget.description.value, event.currentTarget.maxFailed.value);
      this.setState({editing: false, stationData: newStationData});
   }
}

export default StationInfoJumbo;