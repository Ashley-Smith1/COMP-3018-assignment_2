import type { Ticket } from "../src/api/v1/models/ticketModel";
import {
  calculateUrgencyScore,
  getUrgencyLevel,
} from "../src/api/v1/services/ticketService";

describe("Ticket Urgency Service", () => {
  it("should calculate urgency for a low priority ticket", (): void => {
    // Arrange
    const ticket: Ticket = {
      id: 100,
      title: "Test ticket",
      description: "Testing urgency calculation",
      priority: "low",
      status: "open",
      createdAt: new Date(
        Date.now() - 3 * 24 * 60 * 60 * 1000
      ).toISOString(),
    };

    // Act
    const urgencyScore: number = calculateUrgencyScore(ticket);

    // Assert
    expect(urgencyScore).toBe(25);
  });
});


it("should calculate urgency for a high priority ticket", (): void => {
  // Arrange
  const ticket: Ticket = {
    id: 101,
    title: "Password reset issue",
    description: "Reset emails are delayed",
    priority: "high",
    status: "open",
    createdAt: new Date(
      Date.now() - 5 * 24 * 60 * 60 * 1000
    ).toISOString(),
  };

  // Act
  const urgencyScore: number = calculateUrgencyScore(ticket);

  // Assert
  expect(urgencyScore).toBe(55);
});

it("should calculate urgency for a critical priority ticket", (): void => {
  // Arrange
  const ticket: Ticket = {
    id: 102,
    title: "Login page not working",
    description: "Users cannot log in",
    priority: "critical",
    status: "open",
    createdAt: new Date(
      Date.now() - 6 * 24 * 60 * 60 * 1000
    ).toISOString(),
  };

  // Act
  const urgencyScore: number = calculateUrgencyScore(ticket);

  // Assert
  expect(urgencyScore).toBe(80);
});

it("should return the correct urgency level for a score of 80", (): void => {
  // Arrange
  const urgencyScore: number = 80;

  // Act
  const urgencyLevel: string = getUrgencyLevel(urgencyScore);

  // Assert
  expect(urgencyLevel).toBe(
    "Critical. Immediate attention required."
  );
});