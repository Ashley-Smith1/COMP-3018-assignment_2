import request from "supertest";
import type { Response } from "supertest";
import app from "../src/app";
import { HTTP_STATUS } from "../src/constants/httpStatus";

describe("Support Ticket API Routes", () => {
  it("should return all tickets", async (): Promise<void> => {
    // Arrange
    const endpoint: string = "/api/v1/tickets";

    // Act
    const response: Response = await request(app).get(endpoint);

    // Assert
    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

it("should create a new ticket", async (): Promise<void> => {
  // Arrange
  const newTicket: {
  title: string;
  description: string;
  priority: string;
} = {
  title: "Printer not working",
  description: "Office printer is offline",
  priority: "medium",
};

  // Act
  const response: Response = await request(app)
    .post("/api/v1/tickets")
    .send(newTicket);

  // Assert
  expect(response.status).toBe(HTTP_STATUS.CREATED);
  expect(response.body.data.title).toBe("Printer not working");
  expect(response.body.data.priority).toBe("medium");
  expect(response.body.data.status).toBe("open");
  expect(response.body.data.createdAt).toBeDefined();
});

it("should reject an invalid ticket priority", async (): Promise<void> => {
  // Arrange
  const invalidTicket: {
    title: string;
    description: string;
    priority: string;
  } = {
    title: "Printer issue",
    description: "Printer is not responding",
    priority: "urgent",
  };

  // Act
  const response: Response = await request(app)
    .post("/api/v1/tickets")
    .send(invalidTicket);

  // Assert
  expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
  expect(response.body.message).toBe(
    "Invalid priority. Must be one of: critical, high, medium, low"
  );
});

it("should return a ticket by ID", async (): Promise<void> => {
  // Arrange
  const ticketId: number = 3;

  // Act
  const response: Response = await request(app)
    .get(`/api/v1/tickets/${ticketId}`);

  // Assert
  expect(response.status).toBe(HTTP_STATUS.OK);
  expect(response.body.data.id).toBe(ticketId);
  expect(response.body.data.title).toBe("Dashboard loading slowly");
});

it("should update a ticket's status", async (): Promise<void> => {
  // Arrange
  const ticketId: number = 2;
  const updatedStatus: string = "in-progress";

  // Act
  const response: Response = await request(app)
    .put(`/api/v1/tickets/${ticketId}`)
    .send({ status: updatedStatus });

  // Assert
  expect(response.status).toBe(HTTP_STATUS.OK);
  expect(response.body.data.id).toBe(ticketId);
  expect(response.body.data.status).toBe("in-progress");
});

it("should delete a ticket successfully", async (): Promise<void> => {
  // Arrange
  const newTicket: {
  title: string;
  description: string;
  priority: string;
} = {
  title: "Temporary test ticket",
  description: "This ticket will be deleted",
  priority: "low",
};

  const createdResponse: Response = await request(app)
    .post("/api/v1/tickets")
    .send(newTicket);

  const ticketId: number = createdResponse.body.data.id;

  // Act
  const response: Response = await request(app)
    .delete(`/api/v1/tickets/${ticketId}`);

  // Assert
  expect(response.status).toBe(HTTP_STATUS.OK);
  expect(response.body.message).toBe("Ticket deleted successfully");

  const getResponse: Response = await request(app)
    .get(`/api/v1/tickets/${ticketId}`);

  expect(getResponse.status).toBe(HTTP_STATUS.NOT_FOUND);
});

it("should reject an invalid ticket status", async (): Promise<void> => {
  // Arrange
  const ticketId: number = 2;
  const invalidStatus: string = "pending";

  // Act
  const response: Response = await request(app)
    .put(`/api/v1/tickets/${ticketId}`)
    .send({ status: invalidStatus });

  // Assert
  expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
  expect(response.body.message).toBe(
    "Invalid status. Must be one of: open, in-progress, resolved"
  );
});