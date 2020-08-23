import { getUsers, getSections } from '../lib/users'
import { Card, ListGroup } from 'react-bootstrap'
import Link from 'next/link'

export default function Evaluate({ users, sections }) {
   return (
      <>
         <h1>
            Evaluate Member
         </h1>

         <SectionCards users={users} sections={sections} />
      </>
   )
}

function groupByProp(xs, prop) {
   var grouped = {};
   for (var i = 0; i < xs.length; i++) {
      var p = xs[i][prop];
      if (!grouped[p]) { grouped[p] = []; }
      grouped[p].push(xs[i]);
   }
   return grouped;
}

function SectionCards(props) {
   const groupedUsers = groupByProp(props.users, 'sectionID');
   const sectionCards = props.sections.map((section, index) =>
      <Card key={section.sectionID}>
         <Card.Header className="card-header">{section.name}</Card.Header>
         <ListGroup>
            {groupedUsers[section.sectionID].map((user, index) => 
               <Link href="/evaluate/[id]" as={`/evaluate/${user.userID}`} key={user.userID}>
                  <ListGroup.Item className="card-item" as="button">
                     {user.name}
                  </ListGroup.Item>
               </Link>
            )}
         </ListGroup>
      </Card>
   );

   return (
      <>{sectionCards}</>
   );
}

export async function getServerSideProps() {
   const users = await getUsers();
   const sections = await getSections();
   return {
      props: {
         users,
         sections
      }
   }
}