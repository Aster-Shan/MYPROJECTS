import compression from 'compression';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

//import * as errorController from './controllers/web/errorController';
import { limiter } from './midlewares/rateLimiter';
import authRoutes from './routes/v1/auth';
import healthRoutes from './routes/v1/health';
import viewRoutes from './routes/v1/web/view';
export const app = express();
app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(limiter);
app.use(express.static('public'));

app.use('/api/v1', healthRoutes);
app.use('/api/v1', authRoutes);
app.use(viewRoutes);
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

//app.use(errorController.notFound);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || 'server error';
  const errorcode = error.code || 'Error_Code';
  res.status(status).json({ message, error: errorcode });
});
