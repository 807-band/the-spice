import StationInfo from '../../../../components/StationInfo'
import { getInformation } from '../../../../lib/stations'

export default function Setup({information, id, permissions}) {
   const pageData = information.filter(element => element.role=="evaluator" && element.info=="setup");
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