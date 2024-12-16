import { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { FacilityDto } from "./models/facility.dto";
import { facilityTable } from "../../db/schema";
import FacilityConstants from "./models/facility.constant";
import DrizzleService from "../../db";
import { eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";

/**
 * Facility module service to handle all db related operations regarding facility db
 */
export default class FacilityService {
    private drizzleDb!: NeonHttpDatabase;


    /**
     * Creates a new facility entry into database and return the created object 
     * @param facilityMultiPartBody The details for creating the facility i.e name, photo, address, city, phone, zipcode etc
     * @param env Environment details
     * @returns The newly created facility object
     */
    async createFacility(facilityMultiPartBody: {
        [x: string]: string | File;
    }, env: any): Promise<typeof facilityTable.$inferSelect> {
        this.drizzleDb = DrizzleService.getInstance(env.DATABASE_URL);
        const id = Math.floor(Math.random() * 100000000);
        const photoFile = facilityMultiPartBody.photo as File;
        let photoUrl = undefined;
        if (photoFile) {
            console.log(photoFile);
            if (photoFile.size > 5 * 1024 * 1204) {
                throw new HTTPException(400, {message: 'File size less than 5 mb allowed'});
            }
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
                zipCode: facilityMultiPartBody.zipCode,
                type: facilityMultiPartBody.type,
            },
        );
        const facilities = await this.drizzleDb.insert(facilityTable).values({
            id: id,
            name: facilityDto.name,
            state: facilityDto.state,
            city: facilityDto.city,
            address: facilityDto.address,
            phone: facilityDto.phone,
            photoUrl: photoUrl,
            zipCode: facilityDto.zipCode,
            type: facilityDto.type,
        }).returning();
        return facilities[0];
    }

    /**
     * Return the facilities details
     * @param env  Environment details
     * @returns The all existing facilities
     */
    async fetchFacilities(env: any): Promise<typeof facilityTable.$inferSelect[]> {
        this.drizzleDb = DrizzleService.getInstance(env.DATABASE_URL);
        const facilities = await this.drizzleDb.select().from(facilityTable);
        return facilities;
    }

    /**
     * Fetch the given facility
     * @param id Id of the facility to be fetched
     * @param env Environment details
     */
    async fetchFacility(id: number, env: any): Promise<typeof facilityTable.$inferSelect> {
        this.drizzleDb = DrizzleService.getInstance(env.DATABASE_URL);
        const facilities = await this.drizzleDb.select().from(facilityTable).where(eq(facilityTable.id, id));
        return facilities[0];
    }

    /**
     * Delete the given facility
     * @param id Id of the facility to be deleted
     * @param env Environment details
     */
    async deleteFacility(id: number, env: any): Promise<void> {
        this.drizzleDb = DrizzleService.getInstance(env.DATABASE_URL);
        await env.PARAKEET_FACILITY_IMAGES_BUCKET.delete(id);
        await this.drizzleDb.delete(facilityTable).where(eq(facilityTable.id, id));
    }

    /**
     * Creates a new facility entry into database and return the created object 
     * @param id Id of the facility to be updated
     * @param facilityMultiPartBody The details for creating the facility i.e name, photo, address, city, phone, zipcode etc
     * @param env Environment details
     * @returns The newly created facility object
     */
    async updateFacility(id: number, facilityMultiPartBody: {
        [x: string]: string | File;
    }, env: any): Promise<typeof facilityTable.$inferSelect> {
        this.drizzleDb = DrizzleService.getInstance(env.DATABASE_URL);
        const photoFile = facilityMultiPartBody.photo as File;
        let photoUrl = undefined;
        if (photoFile) {
            if (photoFile.size > 5 * 1024 * 1024) {
                throw new HTTPException(400, {message: 'File size less than 5 mb allowed'});
            }
            let facilityBucket = env.PARAKEET_FACILITY_IMAGES_BUCKET;
            await env.PARAKEET_FACILITY_IMAGES_BUCKET.delete(id);
            await facilityBucket.put(id + "", photoFile);
            photoUrl = FacilityConstants.CLOUD_FACILITY_BUCKET_PUBLIC_URL + id;
        }

        let updatedData = {
            photoUrl
        };

        if (photoUrl) {
            updatedData.photoUrl = photoUrl;
        }

        const facilities = await this.drizzleDb.update(facilityTable).set({
            photoUrl: photoUrl,
            name: facilityMultiPartBody.name as string,
            state: facilityMultiPartBody.state as string,
            city: facilityMultiPartBody.city as string,
            address: facilityMultiPartBody.address as string,
            phone: facilityMultiPartBody.phone as string,
            zipCode: facilityMultiPartBody.zipCode as string,
        }).where(eq(facilityTable.id, id)).returning();
        return facilities[0];
    }
}