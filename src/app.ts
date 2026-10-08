import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import { HTTP_STATUS } from "./constants/httpStatus";

const app: Application = express();

// Middleware to read JSON requests
app.use(express.json());

// Middleware to log HTTP requests
app.use(morgan("dev"));

// Health check endpoint
app.get("/api/v1/health", (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({
    status: "OK",
    message: "Support Ticket API is running",
  });
});

export default app;