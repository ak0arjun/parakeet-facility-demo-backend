import { BaseModule } from "../common/base.module";
import FacilityController from "./facility.controller";
import FacilityRouter from "./facility.router";
import FacilityService from "./facility.service";
import FacilityConstants from './models/facility.constant';

/**
 * Facility module:
 * 1. Defining all the components inside module
 * 2. Providing components their dependencies and injecting it
 * 3. Defines exports this module provides
 */
class FacilityModule extends BaseModule {
    facilityRouter: FacilityRouter;
    protected facilityController: FacilityController;
    protected facilityService: FacilityService;
   constructor() {
    super(FacilityConstants.MODULE_NAME);

    this.facilityService = new FacilityService(
        this.drizzleDatabase,
      );
      this.facilityController = new FacilityController(
        this.facilityService,
      );
    this.facilityRouter = new FacilityRouter(this.facilityController);
   }

}

const facilityModule = new FacilityModule();
export const facilityRouter =
facilityModule.facilityRouter.getRouter();