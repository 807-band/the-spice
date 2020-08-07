import StationInfo from '../../../../components/StationInfo'
import { getInformation } from '../../../../lib/stations'

export default function Script({information, id}) {
   const pageData = information.find(element => element.role=="instructor" && element.info=="script");
   return (
      <StationInfo id={id} pageData={pageData}/>
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