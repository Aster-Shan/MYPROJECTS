import compression from "compression";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";

import { limiter } from "./midlewares/rateLimiter";
import healthRoutes from "./routes/v1/health";
export const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(limiter);

app.use("/api/v1", healthRoutes);

// interface Customrequest extends Request {
//   userId?: number;
// }

// app.get("/health", check, (req: Customrequest, res: Response) => {
//   throw new Error("An error occured");
//   res.status(200).json({
//     message: "hello we are ready for response",
//     userId: req.userId,
//   });
// });
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || "server error";
  const errorcode = error.code || "Error_Code";
  res.status(status).json({ message, error: errorcode });
});
