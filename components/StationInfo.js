import { Card, Button, Form } from 'react-bootstrap'
import { putInformation, createInfoTab } from '../lib/stations'
import Link from 'next/link'

export default class StationInfo extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         editing: false,
         content: props.pageData
      }
   }

   render() {
      if (!this.state.editing) {
        const cards = this.state.content.map(c => {
          return (
            <Card key={c.packetID}>
              <Card.Header className="card-header"></Card.Header>
              <Card.Body>
                <Card.Text className="multiline-text">{c.content}</Card.Text>
              </Card.Body>
            </Card>
          )
        });

         return (
            <>
               <Button className="edit-button" onClick={() => this.setState({ editing: true })}>
                  Edit
               </Button>
               <Link href="/stations/[id]" as={`/stations/${this.props.id}`}>
                  <Button variant="secondary" className="edit-button">
                     Back
                  </Button>
               </Link>
               <br />
                { cards }
            </>
         );
      }

      const cards = this.state.content.map(c => this.createEditCard(c));

      return (
        <>
          <Button variant="secondary" className="edit-button" onClick={() => window.location.reload(false)}>
             Done Editing
          </Button>
          <br />
          <div id="info-cards">{ cards }</div>
          <br />
          <Button onClick={this.addCard}>Add Card</Button>
        </>
      );
   }

  saveInfo = (event) => {
    event.preventDefault();
    const infoID = event.target.getAttribute('info-key');
    const stationID = this.props.id;
    const content = event.currentTarget.text.value;
    putInformation(stationID, infoID, content);
  }

  addCard = async () => {
    const stationID = this.props.id;
    // relies on having at least one on the page
    const role = this.props.pageData[0].role;
    const info = this.props.pageData[0].info;

    const cardInfo = await createInfoTab(stationID, role, info);
    const newCard = this.createEditCard(cardInfo);
    this.setState({content: [...this.state.content, newCard]});
    // will not add a complete new form
    // reloading will make it so the new box works :/
    window.location.reload(false)
  }

  createEditCard = (c) => {
    return (
      <Form onSubmit={this.saveInfo} info-key={c.packetID}>
        <Card>
          <Card.Header className="card-header"></Card.Header>
          <Card.Body>
            <Card.Text className="multiline-text">
              <Form.Control id="text" defaultValue={c.content} as="textarea" rows="20" maxlength="4000" />
            </Card.Text>
          </Card.Body>
        </Card>
        <Button type="submit">Save</Button>
      </Form>
    )};
}