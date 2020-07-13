import "../styles/global.scss"
import Head from "next/head";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import Header from "../components/Header";
import SideNav from "../components/SideNav";

export default function App({ Component, pageProps }) {
   return (
      <div>
         <Head>
            <link rel="icon" href="/favicon.ico" />
            <title>807.band</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

            <link
               rel="stylesheet"
               href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
               integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
               crossOrigin="anonymous"
            />
         </Head>
         <Header />
         <Container fluid>
            <Row className="site">
               <Col sm={4} md={3} xl={2} className="side-nav"> 
                  <SideNav />
               </Col>
               <Col className="site-content">
                  <Component {...pageProps} />
               </Col>
               <Col lg={2} className="page-nav">
                  page-nav location
               </Col>
            </Row>
         </Container>
      </div>
   )
}
      
