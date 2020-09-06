import { Card, Button, Form } from 'react-bootstrap'
import { putInformation } from '../lib/stations'
import Link from 'next/link'

export default class StationInfo extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         editing: false,
         text: props.pageData.content
      }
   }

   EditButton = () => {
      if(!this.props.permissions.includes('admin'))
         return <></>
      return (
         <Button className="edit-button" onClick={() => this.setState({ editing: true })}>
            Edit
         </Button>
      )
   }

   render() {
      if (!this.state.editing)
         return (
            <>
               <this.EditButton />
               <Link href="/stations/[id]" as={`/stations/${this.props.id}`}>
                  <Button variant="secondary" className="edit-button">
                     Back
                  </Button>
               </Link>
               <br />
               <Card>
                  <Card.Header className="card-header">{this.props.pageData.role} {this.props.pageData.info}</Card.Header>
                  <Card.Body>
                     <Card.Text className="multiline-text">
                        {this.state.text}
                     </Card.Text>
                  </Card.Body>
               </Card>
            </>
         );
      return (
         <Form onSubmit={this.submitForm}>
            <Button variant="primary" type="submit" className="edit-button">
               Save
            </Button>
            <Button variant="secondary" className="edit-button" onClick={() => this.setState({ editing: false })}>
               Cancel
            </Button>
            <br />
            <Card>
               <Card.Header className="card-header">{this.props.pageData.role} {this.props.pageData.info}</Card.Header>
               <Card.Body>
                  <Card.Text>
                     <Form.Control id="text" defaultValue={this.state.text} as="textarea" rows="30" />
                  </Card.Text>
               </Card.Body>
            </Card>

         </Form>
      );
   }

   submitForm = (event) => {
      event.preventDefault();
      putInformation(this.props.id, this.props.pageData.packetID, event.currentTarget.text.value);
      this.setState({ editing: false, text: event.currentTarget.text.value });
   }
}