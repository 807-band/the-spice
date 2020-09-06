import { Form, Button } from 'react-bootstrap'
import { login, getUser } from '../lib/users'
import { parseCookies } from 'nookies'
import { withRouter } from 'next/router'

class Login extends React.Component {
   constructor(props) {
      super(props);
   }

   handleSubmit = async (event) => {
      event.preventDefault();
      await login(event.currentTarget.username.value, event.currentTarget.password.value);
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
                  <Form.Control type="text" />
               </Form.Group>

               <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" />
               </Form.Group>

               <Button variant="primary" type="submit">
                  Submit
               </Button>
            </Form>
         </>
      )
   }
}

// export async function getServerSideProps(ctx) {
//    const cookies = parseCookies(ctx);
//    const currentUser = await getUser(cookies.currUserID);
//    return {
//       props: {
//          currentUser
//       }
//    }
// }

export default withRouter(Login);