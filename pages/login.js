import { Form, Button } from 'react-bootstrap'
import { login } from '../lib/users'
import { withRouter } from 'next/router'

class Login extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         incorrectUsername: false,
         incorrectPassword: false
      }
   }

   handleSubmit = async (event) => {
      event.preventDefault();
      const res = await login(event.currentTarget.username.value, event.currentTarget.password.value);
      if(res == 'success')
         this.props.router.push('/');
      else if(res == 'incorrectUsername')
         this.setState({ incorrectUsername: true, incorrectPassword: true });
      else if(res == 'incorrectPassword')
         this.setState({ incorrectUsername: false, incorrectPassword: true });
      
   }

   componentDidMount() {
      if(this.props.currentUser)
         this.props.router.push('/');
   }

   render() {
      return (
         <>
            <h1>807.band Login</h1>
            <br />
            <Form onSubmit={this.handleSubmit}>
               <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control isInvalid={this.state.incorrectUsername} type="text" />
               </Form.Group>

               <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control isInvalid={this.state.incorrectPassword} type="password" />
               </Form.Group>

               <Button variant="primary" type="submit">
                  Submit
               </Button>
            </Form>
         </>
      )
   }
}

export default withRouter(Login);