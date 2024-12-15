import { HonoRequest } from "hono";
import FacilityService from "./facility.service";
import { FacilityModel } from "./models/facility.model";
import { FacilityDto } from "./models/facility.dto";

export default class FacilityController {
    constructor(
        protected readonly facilityService: FacilityService,
      ) {}

    async createFacility(honoRequest: HonoRequest): Promise<FacilityModel> {
        const rawBody = await honoRequest.json();
        const createFacilityDto = Object.assign(
            new FacilityDto(),
            rawBody,
          );
        return this.facilityService.createFacility(createFacilityDto);
    }
}