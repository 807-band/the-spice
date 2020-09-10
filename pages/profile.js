import { Button, Form } from 'react-bootstrap'
import { logout, changePassword } from '../lib/users'
import { withRouter } from 'next/router'

class Profile extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         changingPassword: false,
         passwordsMatch: true
      }
   }

   logoutUser = async () => {
      await logout();
      this.props.router.push('/login');
   }

   updatePassword = async (event) => {
      event.preventDefault();
      if (event.currentTarget.password1.value != event.currentTarget.password2.value || !event.currentTarget.password1.value) {
         this.setState({passwordsMatch: false});
      }
      else {
         await changePassword(this.props.currentUser.userID, event.currentTarget.password1.value);
         this.props.router.reload();
      }
   }


   render() {
      if (!this.state.changingPassword)
         return (
            <>
               <h1>{this.props.currentUser.name} ({this.props.currentUser.username})</h1>
               <br />
               <Button onClick={() => this.setState({ changingPassword: true })}>
                  Change Password
               </Button>
               <br /> <br />
               <Button onClick={this.logoutUser}>
                  Log Out
               </Button>
            </>
         );
      return (
         <>
            <h1>{this.props.currentUser.name} ({this.props.currentUser.username})</h1>
            <br />
            <Form noValidate onSubmit={this.updatePassword}>
               <Form.Group controlId="password1">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control type="password" required />
               </Form.Group>
               <Form.Group controlId="password2">
                  <Form.Label>New Password (confirm)</Form.Label>
                  <Form.Control type="password" required isInvalid={!this.state.passwordsMatch}/>
                  <Form.Control.Feedback type="invalid">
                     Please make sure your passwords match.
                  </Form.Control.Feedback>
               </Form.Group>
               <Button type="submit">
                  Set
               </Button>
            </Form>
            <br /> <br />
            <Button variant="secondary" onClick={() => this.setState({ changingPassword: false })}>
               Cancel
             </Button>
         </>
      );
   }
}

export default withRouter(Profile);
