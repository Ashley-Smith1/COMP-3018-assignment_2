import type { Ticket } from "../models/ticketModel";
import { tickets } from "../../../data/tickets";

// Return all tickets
export const getAllTickets = (): Ticket[] => {
  return tickets;
};

// Find one ticket by its ID
export const getTicketById = (id: number): Ticket | undefined => {
  return tickets.find((ticket) => ticket.id === id);
};

// Create a new ticket
export const createTicket = (
    title: string,
    description: string,
    priority: "critical" | "high" | "medium" | "low"
): Ticket => {
  const newTicket: Ticket = {
    id: Math.max(...tickets.map((ticket) => ticket.id)) + 1,
    title,
    description,
    priority,
    status: "open",
    createdAt: new Date().toISOString()
  };
  tickets.push(newTicket);
  return newTicket;
};

// Update an existing ticket
export const updateTicket = (
    id: number,
    updates: Partial<Ticket>
): Ticket | undefined => {
    const ticket: Ticket | undefined = getTicketById(id);

    if (!ticket) {
        return undefined;
    }
    if (updates.title !== undefined) {
    ticket.title = updates.title;
  }

  if (updates.description !== undefined) {
    ticket.description = updates.description;
  }

  if (updates.priority !== undefined) {
    ticket.priority = updates.priority;
  }

  if (updates.status !== undefined) {
    ticket.status = updates.status;
  }

  return ticket;
};

// Delete a ticket
export const deleteTicket = (id: number): boolean => {
  const index: number = tickets.findIndex(
    (ticket: Ticket): boolean => ticket.id === id
  );

  if (index === -1) {
    return false;
  }

  tickets.splice(index, 1);

  return true;
};

// Calculate the urgency score for a ticket
export const calculateUrgencyScore = (ticket: Ticket): number => {
  const baseScores: Record<Ticket["priority"], number> = {
    critical: 50,
    high: 30,
    medium: 20,
    low: 10,
  };

  const createdDate: Date = new Date(ticket.createdAt);
  const currentDate: Date = new Date();

  const millisecondsPerDay: number = 1000 * 60 * 60 * 24;

  const ticketAge: number = Math.max(
    0,
    Math.floor(
      (currentDate.getTime() - createdDate.getTime()) / millisecondsPerDay
    )
  );

  const urgencyScore: number =
    baseScores[ticket.priority] + ticketAge * 5;

  return urgencyScore;
};

export const getUrgencyLevel = (score: number): string => {
  if (score >= 80) {
    return "Critical. Immediate attention required.";
  }

  if (score >= 55) {
    return "High urgency. Prioritize resolution.";
  }

  if (score >= 40) {
    return "Moderate. Schedule for attention.";
  }

  return "Low urgency. Address when capacity allows.";
};