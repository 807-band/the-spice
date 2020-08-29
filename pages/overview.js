import MemberOverview from '../components/station_overview';
import { getStations } from '../lib/stations';
import { getAttempts } from '../lib/evals';

export default function Overview({ allStationsData, allAttempts }) {
  return (
    <>
      <h1>Station Attempts Overview</h1>
      <MemberOverview stations={allStationsData} users={allAttempts} />
    </>
  )
}

export async function getServerSideProps() {
  const allStationsData = await getStations();
  const allAttempts = await getAttempts();

  return {
    props: {
      allStationsData,
      allAttempts
    }
  }
}
