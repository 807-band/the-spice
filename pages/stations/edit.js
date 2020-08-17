import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { getStations, updateOrder } from '../../lib/stations'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import { DragDropContext, resetServerContext } from 'react-beautiful-dnd'
import { Droppable } from 'react-beautiful-dnd'
import { Draggable } from 'react-beautiful-dnd'
import Button from 'react-bootstrap/Button'
import Handle from '../../components/Handle'

export default class extends React.Component {
   constructor(props) {
      super(props);

      const beginnerStations = props.allStationsData.filter(station => station.class == 0);
      const advancedStations = props.allStationsData.filter(station => station.class == 1);

      this.state = {
         beginnerStations: beginnerStations,
         advancedStations: advancedStations
      }
   }

   render() {
      // map beginner and advanced lists into a lists of draggables
      const beginnerList = this.state.beginnerStations.map((s, index) =>
         <Draggable draggableId={s.sID.toString()} index={index} key={s.sID}>
            {provided => (
               <ListGroup.Item key={s.sID} action href={"/stations/" + s.sID} {...provided.draggableProps} ref={provided.innerRef}>
                  Station { index + 1}: { s.title}
                  <Handle {...provided.dragHandleProps} />
               </ListGroup.Item>
            )}
         </Draggable>
      );
      const advancedList = this.state.advancedStations.map((s, index) =>
         <Draggable draggableId={s.sID.toString()} index={index} key={s.sID}>
            {provided => (
               <ListGroup.Item key={s.sID} action href={"/stations/" + s.sID} {...provided.draggableProps} ref={provided.innerRef}>
                  Station { index + 1}: { s.title}
                  <Handle {...provided.dragHandleProps} />
               </ListGroup.Item>
            )}
         </Draggable>
      );

      return (
         <>
            <Head>
               <title>807.band</title>
            </Head>
            <h1>
               Stations
               <Link href="/stations">
                  <Button  variant="primary" className="edit-button">
                     Done
                  </Button>
               </Link>
            </h1>

            <DragDropContext onDragEnd={this.onDragEnd}>
               <Card>
                  <Card.Header>Beginner</Card.Header>
                  <Droppable droppableId="0">
                     {provided => (
                        <ListGroup ref={provided.innerRef} {...provided.droppableProps}>
                           {beginnerList}
                           {provided.placeholder}
                        </ListGroup>
                     )}
                  </Droppable>
               </Card>
            </DragDropContext>
            <br />
            <DragDropContext onDragEnd={this.onDragEnd}>
               <Card>
                  <Card.Header>Advanced</Card.Header>
                  <Droppable droppableId="1">
                     {provided => (
                        <ListGroup variant="flush" ref={provided.innerRef} {...provided.droppableProps}>
                           {advancedList}
                           {provided.placeholder}
                        </ListGroup>
                     )}
                  </Droppable>
               </Card>
            </DragDropContext>
         </>
      )
   }

   // called after a draggable is dropped
   onDragEnd = async (result) => {
      if (result.destination == null)
         return;
      const from = result.source.index;
      const to = result.destination.index;

      // droppableId 0 for beginner, 1 for advanced
      const stationList = result.source.droppableId == 0 ? this.state.beginnerStations : this.state.advancedStations;
      
      // update state to reflect order changes visually
      const newStationList = Array.from(stationList);
      newStationList.splice(from, 1);
      newStationList.splice(to, 0, stationList[from]);
      for (var i = 0; i < newStationList.length; i++)
         newStationList[i].order = i;
      if (result.source.droppableId == 0) //beginner
         this.setState({
            beginnerStations: newStationList
         });
      else //advanced
         this.setState({
            advancedStations: newStationList
         });

      await updateOrder(result.draggableId, result.destination.index);
   };
}

export async function getServerSideProps() {
   resetServerContext()
   const allStationsData = await getStations()
   return {
      props: {
         allStationsData,
      },
   }
}