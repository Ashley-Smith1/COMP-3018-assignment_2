import type { Request, Response } from "express";
import type { Ticket } from "../models/ticketModel";
import { HTTP_STATUS } from "../../../constants/httpStatus";
import type { TicketUrgency } from "../services/ticketService";
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  getTicketUrgency,
} from "../services/ticketService";

// Get all support tickets
export const getTickets = (
  _req: Request,
  res: Response
): void => {
  const tickets: Ticket[] = getAllTickets();

  res.status(HTTP_STATUS.OK).json({
    message: "Tickets retrieved successfully",
    data: tickets,
  });
};

// Get a single support ticket by ID
export const getTicket = (
  req: Request,
  res: Response
): void => {
  const id: number = Number(req.params.id);
  const ticket: Ticket | undefined = getTicketById(id);

  if (!ticket) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Ticket not found",
    });
    return;
  }

  res.status(HTTP_STATUS.OK).json({
    message: "Ticket retrieved successfully",
    data: ticket,
  });
};

// Create a new support ticket
export const createTicketController = (
  req: Request,
  res: Response
): void => {
  const { title, description, priority } = req.body;

  // Check if title is missing
  if (typeof title !== "string" || title.trim() === "") {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Missing required field: title",
    });
    return;
  }

  // Check if description is missing
  if (
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Missing required field: description",
    });
    return;
  }

  // Check if priority is valid
  const validPriorities: string[] = [
    "critical",
    "high",
    "medium",
    "low",
  ];

  if (
    typeof priority !== "string" ||
    !validPriorities.includes(priority)
  ) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message:
        "Invalid priority. Must be one of: critical, high, medium, low",
    });
    return;
  }

  // Create the ticket after validation passes
  const newTicket: Ticket = createTicket(
    title,
    description,
    priority as Ticket["priority"]
  );

  res.status(HTTP_STATUS.CREATED).json({
    message: "Ticket created successfully",
    data: newTicket,
  });
};
// Update an existing support ticket
export const updateTicketController = (
  req: Request,
  res: Response
): void => {
  const id: number = Number(req.params.id);
  const ticket: Ticket | undefined = getTicketById(id);

  // Check whether the ticket exists
  if (!ticket) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Ticket not found",
    });
    return;
  }

  const { title, description, priority, status } = req.body;

  // Validate priority if provided
  const validPriorities: string[] = [
    "critical",
    "high",
    "medium",
    "low",
  ];

  if (
    priority !== undefined &&
    !validPriorities.includes(priority)
  ) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message:
        "Invalid priority. Must be one of: critical, high, medium, low",
    });
    return;
  }

  // Validate status if provided
  const validStatuses: string[] = [
    "open",
    "in-progress",
    "resolved",
  ];

  if (
    status !== undefined &&
    !validStatuses.includes(status)
  ) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message:
        "Invalid status. Must be one of: open, in-progress, resolved",
    });
    return;
  }

  // Apply the updates
  const updatedTicket: Ticket | undefined = updateTicket(id, {
    title,
    description,
    priority,
    status,
  });

  res.status(HTTP_STATUS.OK).json({
    message: "Ticket updated successfully",
    data: updatedTicket,
  });
};

// Delete an existing support ticket
export const deleteTicketController = (
  req: Request,
  res: Response
): void => {
  const id: number = Number(req.params.id);

  const deleted: boolean = deleteTicket(id);

  if (!deleted) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Ticket not found",
    });
    return;
  }

  res.status(HTTP_STATUS.OK).json({
    message: "Ticket deleted successfully",
  });
};

 // Get a ticket's calculated urgency
export const getTicketUrgencyController = (
  req: Request,
  res: Response
): void => {
  const id: number = Number(req.params.id);

  const ticket: TicketUrgency | undefined = getTicketUrgency(id);

  if (!ticket) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Ticket not found",
    });
    return;
  }

  res.status(HTTP_STATUS.OK).json({
    message: "Ticket urgency calculated",
    data: ticket,
  });
};