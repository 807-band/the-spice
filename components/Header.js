import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../styles/modules/Header.module.css"

class Header extends React.Component {
   LinkText = (show, text) => {
      if(!show)
         return <></>
      return (
         <a className="nav-link">{text}</a>
      )
   }

   render() {
      return (
         <Navbar className="header mustang-green" variant="dark" expand="sm" fixed="top">
            <Navbar.Brand href="/">807.band</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
               <Nav className="mr-auto">
                  <Link href="/">
                     <a className="nav-link">Home</a>
                  </Link>
                  <Link href="/events">
                     <a className="nav-link">Events</a>
                  </Link>
                  <Link href="/stations">
                     <a className="nav-link">Stations</a>
                  </Link>
                  <Link href="/evaluate">
                     {this.LinkText(this.props.permissions.includes('eval') || 
                     this.props.permissions.includes('admin'), 'Evaluate')}
                  </Link>
                  <Link href="/overview">
                     {this.LinkText(this.props.permissions.includes('admin'), 'Overview')}
                  </Link>
               </Nav>
               <Nav className="ml-auto">
                  <Link href="/profile">
                     <a className="nav-link">Profile</a>
                  </Link>
               </Nav>
            </Navbar.Collapse>
         </Navbar>
      )
   }
}

export default Header;
