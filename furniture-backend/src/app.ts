import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import morgan from 'morgan';
import path from 'path';
import { limiter } from './midlewares/rateLimiter';
import routes from './routes/v1/';
export const app = express();
app.set('view engine', 'ejs');
app.set('views', 'src/views');

var whitelist = ['http://example1.com', 'http://localhost:5173'];
var corsOptions = {
  origin: function (
    origin: any,
    callback: (err: Error | null, origin?: any) => void,
  ) {
    //allow request with no origin like mobile apps or Postman
    if (!origin) return callback(null, true);
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // allow cookies or authorization header
};

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(limiter);

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    backend: {
      loadPath: path.join(
        process.cwd(),
        'src/locales',
        '{{lng}}',
        '{{ns}}.json',
      ),
    },
    detection: { order: ['querystring', 'cookie'], cache: ['cookie'] },
    fallbackLng: 'en',
    preload: ['en', 'mm'],
  });
app.use(middleware.handle(i18next));

app.use(express.static('public'));

app.use(routes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || 'server error';
  const errorcode = error.code || 'Error_Code';
  res.status(status).json({ message, error: errorcode });
});
