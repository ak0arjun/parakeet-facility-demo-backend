import { Env, HonoRequest } from "hono";
import FacilityService from "./facility.service";
import { FacilityModel } from "./models/facility.model";
import { FacilityDto } from "./models/facility.dto";
import { HTTPException } from "hono/http-exception";

/**
 * Defines controller for the facility module handling api routes and validating and process inputs.
 */
export default class FacilityController {
    constructor(
        protected readonly facilityService: FacilityService,
    ) { }

    /**
     * Create a new facility 
     * @param honoRequest Request details sent by user
     * @param env Environment Detail
     * @returns Facility object created
     */
    async createFacility(honoRequest: HonoRequest, env: Env): Promise<FacilityModel> {
        const multiPartBody = await honoRequest.parseBody();
        if (!multiPartBody.name || !multiPartBody.city || !multiPartBody.address || !multiPartBody.state || !multiPartBody.zipCode || !multiPartBody.phone) {
            throw new HTTPException(400, { message: 'Required input is missing!!' });
        }
        return this.facilityService.createFacility(multiPartBody, env);
    }

    /**
     * Fetches the given facility details
     * @param env Environment Detail
     * @returns  Facility object
     */
    async fetchFacilities(env: Env): Promise<FacilityModel[]> {
        return this.facilityService.fetchFacilities(env);
    }

    /**
     * Fetch the given facility object by id
     * @param honoRequest Request details sent by user
     * @param env Environment Detail
     */
    async fetchFacility(honoRequest: HonoRequest, env: Env): Promise<FacilityModel> {
        const id = honoRequest.param('id');
        return await this.facilityService.fetchFacility(parseInt(id!), env);
    }

    /**
     * Delete the given facility object by id
     * @param honoRequest Request details sent by user
     * @param env Environment Detail
     */
    async deleteFacility(honoRequest: HonoRequest, env: Env): Promise<void> {
        const id = honoRequest.param('id');
        await this.facilityService.deleteFacility(parseInt(id!), env);
    }

    /**
     * Updates the given facility 
     * @param honoRequest Request details sent by user
     * @param env Environment Detail
     * @returns Facility object updated
     */
    async updateFacility(honoRequest: HonoRequest, env: Env): Promise<FacilityModel> {
        const id = honoRequest.param('id');
        const multiPartBody = await honoRequest.parseBody();
        return this.facilityService.updateFacility(parseInt(id!), multiPartBody, env)
    }
}