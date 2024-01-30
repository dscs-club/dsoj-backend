/**
 * Setup express server.
 */

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';

import 'express-async-errors';

import BaseRouter from '@src/routes/api';
import Paths from '@src/constants/Paths';

import EnvVars from '@src/constants/EnvVars';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import { NodeEnvs } from '@src/constants/misc';
import { RouteError } from '@src/other/classes';

import session from 'express-session';
import mongoSession from 'connect-mongodb-session';
import { ISessionData, Iuser } from './models/User';

// **** Variables **** //

const app = express();

// ** Logger ** //
console.log('NODE_ENV: ' + EnvVars.NodeEnv);

// **** Setup **** //

// cors middleware
import cors from 'cors';
app.use(cors({
  origin: "http://localhost:3001", 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Access-Control-Allow-Origin'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(EnvVars.CookieProps.Secret));

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan('dev'));
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}


//session
const mongoURI = EnvVars.DB.URI;
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: mongoURI,
  collection: 'Sessions'
});
store.on('error', function (err: Error) {
  console.log(err);
});
app.use(session({
  secret: EnvVars.CookieProps.Secret,
  name: 'dsoj_session',
  saveUninitialized: true,
  resave: true,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}))

declare module 'express-session' {
  interface SessionData {
    user: ISessionData
  }
}

// Add APIs, must be after middleware
app.use(Paths.Base, BaseRouter);

// Add error handler
app.use((
  err: Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (EnvVars.NodeEnv !== NodeEnvs.Test.valueOf()) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
  }
  return res.status(status).json({ error: err.message });
});


// **** Export default **** //

export default app;
