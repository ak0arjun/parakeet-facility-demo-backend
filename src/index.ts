import { Hono } from 'hono'
import { facilityRouter } from './modules/facility/facility.module'
import { HTTPException } from 'hono/http-exception';

const app = new Hono()
app.route('/facility', facilityRouter);

app.get('/', (c) => {
  // TODO: return error
  throw new HTTPException(500, { message: 'No route found' });
})


export default app
