import { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { FacilityDto } from "./models/facility.dto";
import { facilityTable } from "../../db/schema";
import FacilityConstants from "./models/facility.constant";
import DrizzleService from "../../db";

export default class FacilityService {
    private drizzleDb!: NeonHttpDatabase;


    async createFacility(facilityMultiPartBody: {
        [x: string]: string | File;
    },  env: any): Promise<typeof facilityTable.$inferSelect> {
        this.drizzleDb = DrizzleService.getInstance(env.DATABASE_URL);
        const id = Math.floor(Math.random()*100000000);
        const photoFile = facilityMultiPartBody.photo;
        let photoUrl = undefined;
        if (photoFile) {
            let facilityBucket = env.PARAKEET_FACILITY_IMAGES_BUCKET;
            await facilityBucket.put(id + "", photoFile);
            photoUrl = FacilityConstants.CLOUD_FACILITY_BUCKET_PUBLIC_URL + id;
        }
        const facilityDto = Object.assign(
            new FacilityDto(),
            {
                name: facilityMultiPartBody.name,
                state: facilityMultiPartBody.state,
                city: facilityMultiPartBody.city,
                address: facilityMultiPartBody.address,
                phone: facilityMultiPartBody.phone,
                photoUrl: "",
                zipCode: facilityMultiPartBody.zipCode,
            },
        );
        const facility = await this.drizzleDb.insert(facilityTable).values({
            id: id,
            name: facilityDto.name,
            state: facilityDto.state,
            city: facilityDto.city,
            address: facilityDto.address,
            phone: facilityDto.phone,
            photoUrl: photoUrl,
            zipCode: facilityDto.zipCode,
        }).returning();
        return facility[0];
    }
}