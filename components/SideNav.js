import styles from "../styles/modules/SideNav.module.scss"
import Router from "next/router"
import Link from 'next/link'

const handleRouteChange = (url) => {
   console.log("now on page: " + url);
};

/* TODO toggle the dropdown below the proper grouping */
Router.events.on('routeChangeStart', handleRouteChange)

class SideNav extends React.Component {
   constructor(props) {
      super(props);
      this.state = { path: null };
   }

   componentDidMount() {
      this.setState({ path: window.location.pathname });
   }

   render() {
      return (
         <>
            <Link href="/">
               <a className={styles.parentPage}>Home</a>
            </Link>
            <Link href="/events">
               <a className={styles.parentPage}>Events</a>
            </Link>
            <Link href="/stations">
               <a className={styles.parentPage}>Stations</a>
            </Link>
            <Link href="/stations/create">
               <a className={styles.childPage}>Create Station</a>
            </Link>
            <Link href="/stations">
               <a className={styles.childPage}>View Stations</a>
            </Link>
            <Link href="/stations/progress">
               <a className={styles.childPage}>Station Progress</a>
            </Link>
            <Link href="/evaluate">
               <a className={styles.parentPage}>Evaluate</a>
            </Link>
            <Link href="/overview">
               <a className={styles.parentPage}>Overview</a>
            </Link>
            <Link href="/profile">
               <a className={styles.parentPage}>Profile</a>
            </Link>

            <br /><br /><br />
            <div className={styles.test}>only on reloads: {this.state.path}</div>
         </>

      )
   }
}

export default SideNav;
