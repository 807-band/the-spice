import "../styles/global.scss"
import Head from "next/head";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { parseCookies } from 'nookies'
import { getUser, getPermissions } from '../lib/users'
import Login from '../pages/login'
import App from 'next/app'
import { withRouter } from 'next/router'

import Header from "../components/Header";
import SideNav from "../components/SideNav";
import PageNav from "../components/PageNav";

class MyApp extends React.Component {
   constructor(props) {
      super(props);
   }

   componentDidMount() {
      if (this.props.pageProps.currentUser == '')
         this.props.router.push('/login');
   }

   render() {
      if (this.props.pageProps.currentUser == '') {
         if (this.props.Component != Login)
            return null;
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
               <Container fluid>
                  <this.props.Component {...this.props.pageProps} />
               </Container>
            </div>
         );
      }
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
            <Header permissions={this.props.pageProps.permissions}/>
            <Container fluid>
               <Row className="site">
                  <Col sm={4} md={3} xl={2} className="side-nav">
                     <SideNav permissions={this.props.pageProps.permissions}/>
                  </Col>
                  <Col className="site-content">
                     <this.props.Component {...this.props.pageProps} />
                  </Col>
                  <Col lg={2} className="page-nav">
                     <PageNav />
                  </Col>
               </Row>
            </Container>
         </div>
      )
   }
}

MyApp.getInitialProps = async (appContext) => {
   // calls page's `getInitialProps` and fills `appProps.pageProps`
   const appProps = await App.getInitialProps(appContext);

   const cookies = parseCookies(appContext.ctx);
   const currentUser = await getUser(cookies.currUserID);
   const permissions = await getPermissions(cookies.currUserID);
   appProps.pageProps.currentUser = currentUser;
   appProps.pageProps.permissions = permissions;

   return { ...appProps }
}

export default withRouter(MyApp);