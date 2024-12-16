import { Hono } from 'hono'
import { facilityRouter } from './modules/facility/facility.module'
import { HTTPException } from 'hono/http-exception';
import { cors } from 'hono/cors';

const app = new Hono()

 const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS,PATCH,DELETE",
    "Access-Control-Max-Age": "86400",
}

app.use('/facility/*', cors(
{
  origin:'*',
  allowMethods: ['POST', 'GET', 'OPTIONS','PATCH','DELETE'],
}
));

app.use('/facility', cors(
  {
    origin:'*',
    allowMethods: ['POST', 'GET', 'OPTIONS','PATCH','DELETE'],
  }
  ));

app.route('/facility', facilityRouter);
app.route('/facility/*', facilityRouter);

app.get('/', (c) => {
  throw new HTTPException(404, { message: 'No route found' });
})


export default app
