import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { postStation } from '../../lib/stations'

export default class CreateStation extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         validated: false,
      }
   }

   render() {
      const handleSubmit = async (event) => {
         const form = event.currentTarget;
         if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
         }
         else
            await postStation(form.title.value, form.description.value, form.rank.value == "beginner" ? 0 : 1); 
         this.setState({ validated: true });
      };

      return (
         <>
            <h1>
               Create Station
            </h1>
            <br />

            <Form noValidate validated={this.state.validated} onSubmit={handleSubmit}>
               <Form.Group controlId="title">
                  <Form.Label>Station Title</Form.Label>
                  <Form.Control type="text" placeholder="Title" required />
               </Form.Group>

               <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" placeholder="Description" />
               </Form.Group>

               <Form.Group controlId="rank">
                  <Form.Label>Rank</Form.Label>
                  <Form.Control type="text" required as="select">
                     <option></option>
                     <option>beginner</option>
                     <option>advanced</option>
                  </Form.Control>
               </Form.Group>

               <Button variant="primary" type="submit">
                  Submit
               </Button>
            </Form>
         </>
      )
   }
}