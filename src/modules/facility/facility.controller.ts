import { Env, HonoRequest } from "hono";
import FacilityService from "./facility.service";
import { FacilityModel } from "./models/facility.model";
import { FacilityDto } from "./models/facility.dto";
import { HTTPException } from "hono/http-exception";

export default class FacilityController {
    constructor(
        protected readonly facilityService: FacilityService,
      ) {}

    async createFacility(honoRequest: HonoRequest, env:  Env): Promise<FacilityModel> {
        const multiPartBody = await honoRequest.parseBody();
        if (!multiPartBody.name) {
            throw new HTTPException(400, { message: 'Name is required!!' });
        }
        return this.facilityService.createFacility(multiPartBody, env);
    }
}