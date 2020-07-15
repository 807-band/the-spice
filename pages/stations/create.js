import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { postStation } from '../../lib/stations'
import { useState } from 'react'

export default function CreateStation() {
   const [validated, setValidated] = useState(false);

   const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
         event.preventDefault();
         event.stopPropagation();
      }
      else {
         postStation(form.title.value, form.description.value, form.rank.value, parseInt(form.order.value));
      }
      setValidated(true);
   };

   return (
      <>  
         <h1>
            Create Station
         </h1>
         <br />

         <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="title">
               <Form.Label>Station Title</Form.Label>
               <Form.Control type="text" placeholder="Title" required/>
            </Form.Group>

            <Form.Group controlId="description">
               <Form.Label>Description</Form.Label>
               <Form.Control type="text" placeholder="Description"/>
            </Form.Group>

            <Form.Group controlId="rank">
               <Form.Label>Rank</Form.Label>
               <Form.Control type="text" required as="select">
                  <option></option>
                  <option>beginner</option>
                  <option>advanced</option>
               </Form.Control>
            </Form.Group>
            
            <Form.Group controlId="order">
               <Form.Label>Order</Form.Label>
               <Form.Control type="number" placeholder="Order" required/>
            </Form.Group>

            <Button variant="primary" type="submit">
               Submit
            </Button>
         </Form>
      </>
   )
}
