import './preStart'; // always have this at the top of this file in order to execute these scripts first
import express, { type Express } from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import hpp from 'hpp';
import helmet from 'helmet';
import http from 'http';
import bodyParser from 'body-parser';
import { connectDB } from './utils/db';
import environment from './utils/environment';
import { errorHandler, listenToErrorEvents } from './utils/errorHandler';
import logger from './utils/logger';
import { authRouter } from './routes/auth';
// TODO: Add types to import below
// import xss from 'xss-clean';

void connectDB();

const app: Express = express();

// Body parser
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Cookie parser
app.use(cookieParser());

// Dev logging middlewares
if (environment.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent http param pollution
app.use(hpp());

// Enable CORS
// app.use(cors());
app.use(cors({ credentials: true, origin: 'http://localhost:8080' })); // I put this line of code because I could see my jwt in the browser

// Mount routers
app.use('/api/auth', authRouter);
app.use(errorHandler);

const PORT = environment.PORT || 3000;

const onListening = (server: http.Server) => (): void => {
    const addr = server.address();
    const bind =
        typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port ?? ''}`;
    logger.info(
        `Server running in ${environment.NODE_ENV} listening on ${bind}`,
    );
};

// create a server based on our Express application
const server = http.createServer(app);
// add an error handler for anything uncaught by the app
listenToErrorEvents(server);
server.on('listening', onListening(server));
server.listen(PORT);
