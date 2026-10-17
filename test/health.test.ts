import request from "supertest";
import app from "../src/app";
import { HTTP_STATUS } from "../src/constants/httpStatus";

describe("Health Check API", () => {
    it("should return 200 OK for health check", async () => {
        const expectedStatus = HTTP_STATUS.OK;

        const response = await request(app).get("/api/v1/health");
        expect(response.status).toBe(expectedStatus);
        expect(response.body.status).toBe("OK");
    });
});