import { Hono } from 'hono'
import { facilityRouter } from './modules/facility/facility.module'

const app = new Hono()
app.route('/facility', facilityRouter);

app.get('/', (c) => {
  // TODO: return error
  return c.text('Hello Hono!')
})


export default app
