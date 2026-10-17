import { Router } from "express";
import type { Router as ExpressRouter } from "express";

import {
  getTickets,
  getTicket,
  createTicketController,
  updateTicketController,
  deleteTicketController,
  getTicketUrgencyController,
} from "../controllers/ticketController";

// Create the ticket router
const router: ExpressRouter = Router();

// Ticket endpoints
router.get("/", getTickets);
router.post("/", createTicketController);

// Urgency route must come before the general ID route
router.get("/:id/urgency", getTicketUrgencyController);

router.get("/:id", getTicket);
router.put("/:id", updateTicketController);
router.delete("/:id", deleteTicketController);

export default router;