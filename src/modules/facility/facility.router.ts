import { Context } from "hono";
import { BaseRouter } from "../common/base.router";
import FacilityController from "./facility.controller";
import { HTTPException } from 'hono/http-exception'

/**
 * Defines routes supported by facility module:
 * 1. Get given facilities
 * 2. Update any given facility
 * 3. Delete any facility
 * 4. Create a new facility
 */
export default class FacilityRouter extends BaseRouter<
  FacilityController
> {
  protected initRoutes(): void {
    this.router.post("/", (async (honoContext: Context) => {
      try {
        const facility = await this.controller.createFacility(honoContext.req, honoContext.env);
        return honoContext.json(facility);
      } catch (ex: any) {
        throw new HTTPException(ex.status || 500, { message: ex.message});
      }
    }));


    this.router.get("/", (async (honoContext: Context) => {
      try {
        const facilities = await this.controller.fetchFacilities(honoContext.env);
        return honoContext.json(facilities);
      } catch (ex: any) {
        throw new HTTPException(ex.status || 500, { message: ex.message});
      }
    }));

    this.router.delete("/:id", (async (honoContext: Context) => {
      try {
        const facility = await this.controller.deleteFacility(honoContext.req, honoContext.env);
        return honoContext.text("Deleted!");
      } catch (ex: any) {
        throw new HTTPException(ex.status || 500, { message: ex.message});
      }
    }));

    this.router.patch("/:id", (async (honoContext: Context) => {
      try {
        const facility = await this.controller.updateFacility(honoContext.req, honoContext.env);
        return honoContext.json(facility);
      } catch (ex: any) {
        throw new HTTPException(ex.status || 500, { message: ex.message});
      }
    }));
  };
}