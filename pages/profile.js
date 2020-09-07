import { Button } from 'react-bootstrap'
import { logout } from '../lib/users'
import { withRouter } from 'next/router'

class Profile extends React.Component {
   logoutUser = async () => {
      await logout();
      this.props.router.push('/login')
   }


   render() {
      return (
         <>
            <Button onClick={this.logoutUser}>
               Log Out
            </Button>
         </>
      )
   }
}

export default withRouter(Profile);
