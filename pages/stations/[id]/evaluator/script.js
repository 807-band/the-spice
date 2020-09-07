import StationInfo from '../../../../components/StationInfo'
import { getInformation } from '../../../../lib/stations'

export default function Script({information, id, permissions}) {
   const pageData = information.find(element => element.role=="evaluator" && element.info=="script");
   return (
      <StationInfo id={id} pageData={pageData} permissions={permissions}/>
   )
}

export async function getServerSideProps({ params }) {
   const information = await getInformation(params.id);
   return {
      props: {
         information,
         id: params.id
      }
   }
}