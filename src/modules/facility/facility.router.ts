import { Context } from "hono";
import { BaseRouter } from "../common/base.router";
import FacilityController from "./facility.controller";
import { HTTPException } from 'hono/http-exception'

export default class FacilityRouter extends BaseRouter<
    FacilityController
> {
    protected initRoutes(): void { 
        this.router.get("/", (c: Context) => {
            return c.text('Hello Hono!')
          });

        this.router.post("/", (async (honoContext: Context) => {
            try {
                const facility= await this.controller.createFacility(honoContext.req, honoContext.env);
                return honoContext.json(facility);
              } catch (ex: any) {
                throw new HTTPException(500, { message: 'Something went wrong!!' });
              }
        }));
        
    };
}