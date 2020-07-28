import Head from 'next/head'
import Link from 'next/link'
import { getStations } from '../lib/stations'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function Stations({ allStationsData }) {
    return (
        <>
            <Head>
                <title>807.band</title>
            </Head>
            <h1>
                Stations
                <Link href="/stations/edit">
                    <Button variant="primary" className="edit-button">
                        Edit Order
                    </Button>
                </Link>
            </h1>

            <StationCards data={allStationsData} />
        </>
    )
}

function StationCards(props) {
    const beginnerStations = [], advancedStations = [];
    props.data.forEach((station) => {
        if (station.rank == "beginner")
            beginnerStations.push(station);
        else if (station.rank == "advanced")
            advancedStations.push(station);
    });

    beginnerStations.sort((a, b) => (a.order > b.order) ? 1 : -1);
    advancedStations.sort((a, b) => (a.order > b.order) ? 1 : -1);

    const beginnerList = beginnerStations.map((s, index) =>
        <ListGroup.Item key={s.id} action href={"/stations/" + s.id}>
            Station { index + 1 }: {s.title}
        </ListGroup.Item>
    );

    const advancedList = advancedStations.map((s, index) =>
        <ListGroup.Item key={s.id} action href={"/stations/" + s.id}>
            Station { index + 1 }: {s.title}
        </ListGroup.Item>
    );

    return (
        <>
            <Card>
                <Card.Header>Beginner</Card.Header>
                <ListGroup>
                    { beginnerList }
                </ListGroup>
            </Card>
            <br />
            <Card>
                <Card.Header>Advanced</Card.Header>
                <ListGroup>
                    { advancedList }
                </ListGroup>
            </Card>
        </>
    );
}

export async function getServerSideProps() {
    const allStationsData = await getStations()
    return {
        props: {
            allStationsData
        }
    }
}