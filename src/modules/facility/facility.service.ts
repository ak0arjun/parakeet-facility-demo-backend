import { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { FacilityDto } from "./models/facility.dto";
import { facilityTable } from "../../db/schema";

export default class FacilityService {
    constructor(private readonly drizzleDb: NeonHttpDatabase) { }


    async createFacility(facilityDto: FacilityDto): Promise<typeof facilityTable.$inferSelect> {
        const facility = await this.drizzleDb.insert(facilityTable).values({
            name: facilityDto.name, state: facilityDto.state, city: facilityDto.city, address: facilityDto.address, phone: facilityDto.phone, photoUrl: "", zipCode: facilityDto.zipCode,
        }).returning();
        return facility[0];
    }
}