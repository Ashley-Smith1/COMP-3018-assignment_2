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
