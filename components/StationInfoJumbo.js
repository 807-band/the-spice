import Head from 'next/head'
import Link from 'next/link'
import { Button, Jumbotron } from 'react-bootstrap'

class StationInfoJumbo extends React.Component {
   render() {
      return (
         <>
            <Link href={this.props.buttonTo} as={this.props.as}>
               <Button variant="primary" className="edit-station-button">
                  {this.props.buttonText}
               </Button>
            </Link>
            <Jumbotron className="cal-poly-gold">
               <Head>
                  <title>{this.props.stationData.title} - 807.band</title>
               </Head>
               <h1 className="station-title">
                  {this.props.stationData.title}
               </h1>
               <br />
               <div className="description">{this.props.stationData.description}</div>
               <br />
               <div className="maxMissed">Maximum failed: {this.props.stationData.maxFailed}</div>
            </Jumbotron>
         </>
      );
   }
}

export default StationInfoJumbo;