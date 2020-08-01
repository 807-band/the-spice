import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { getStationsSorted, updateOrder } from '../../lib/stations'
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

      this.state = {
         stations: [props.allStationsData.beginnerStations, props.allStationsData.advancedStations],
         beginnerStations: props.allStationsData.beginnerStations,
         advancedStations: props.allStationsData.advancedStations,
         dragQueue: []
      }
   }

   render() {
      // map beginner and advanced lists into a lists of draggables
      const beginnerList = this.state.beginnerStations.map((s, index) =>
         <Draggable draggableId={s.id} index={index} key={s.id}>
            {provided => (
               <ListGroup.Item key={s.id} action href={"/stations/" + s.id} {...provided.draggableProps} ref={provided.innerRef}>
                  Station { index + 1}: { s.title}
                  <Handle {...provided.dragHandleProps} />
               </ListGroup.Item>
            )}
         </Draggable>
      );
      const advancedList = this.state.advancedStations.map((s, index) =>
         <Draggable draggableId={s.id} index={index} key={s.id}>
            {provided => (
               <ListGroup.Item key={s.id} action href={"/stations/" + s.id} {...provided.draggableProps} ref={provided.innerRef}>
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
                  <Button disabled={this.state.dragQueue.length > 0} variant="primary" className="edit-button">
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
      // add change to the queue
      this.state.dragQueue.push(1);
      const from = result.source.index;
      const to = result.destination.index;

      // either beginnerStations or advancedStations
      // droppableId 0 for beginner, 1 for advanced
      const stationList = (this.state.stations)[result.source.droppableId];

      // update state to reflect order changes visually
      const newStationList = Array.from(stationList);
      newStationList.splice(from, 1);
      newStationList.splice(to, 0, stationList[from]);
      for (var i = 0; i < newStationList.length; i++)
         newStationList[i].order = i;
      if (result.source.droppableId == 0) //beginner
         this.setState({
            beginnerStations: newStationList,
            stations: [newStationList, this.state.advancedStations]
         });
      else //advanced
         this.setState({
            advancedStations: newStationList,
            stations: [this.state.beginnerStations, newStationList]
         });

      // actually change the orders in the DB

      // if item moved up
      if (from > to) {
         for (var i = to; i < from; i++) {
            await updateOrder(stationList[i].id, i + 1);
         }
      }
      // if item moved down
      else if (to > from) {
         for (var i = from + 1; i <= to; i++) {
            await updateOrder(stationList[i].id, i - 1);
         }
      }
      // update item that moved
      await updateOrder(result.draggableId, result.destination.index);

      // remove change from the queue
      // 'done' button can only be pressed when DB changes are ALL finished (i.e. when queue is empty)
      // prevents race condition
      this.setState({ dragQueue: this.state.dragQueue.slice(1) });
   };
}

export async function getServerSideProps() {
   resetServerContext()
   const allStationsData = await getStationsSorted()
   return {
      props: {
         allStationsData,
      },
   }
}