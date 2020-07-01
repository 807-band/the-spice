import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import axios from 'axios'

// Initialize the cors middleware
const cors = initMiddleware(
   // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
   Cors({
      // Only allow requests with GET, POST and OPTIONS
      methods: ['GET', 'POST', 'OPTIONS'],
   })
)

export default async function handler(req, res) {
   // Run cors
   await cors(req, res)
   
   const stations = await axios.get('http://ec2-52-42-80-173.us-west-2.compute.amazonaws.com:3001/api/station')
   
   // Rest of the API logic
   // res.json({ message: 'Hello Everyone!' })
   res.json(stations.data);
}
