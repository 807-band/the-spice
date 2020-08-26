import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../styles/modules/Header.module.css"

class Header extends React.Component {
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
                     <a className="nav-link">Evaluate</a>
                  </Link>
                  <Link href="/overview">
                     <a className="nav-link">Overview</a>
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
