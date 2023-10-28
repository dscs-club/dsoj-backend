import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../constants/Paths';
import HealthRoutes from './HealthRoutes';
import JudgeRoutes from './JudgeRoutes';
import SessionRoutes from './SessionRoutes';


// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// **** Health **** //
apiRouter.get(Paths.Health, HealthRoutes.getHealth);

// **** session **** //
apiRouter.post(Paths.Account.Login, SessionRoutes.postLogin);
apiRouter.get(Paths.Account.Logout, SessionRoutes.getLogout);

// **** Export default **** //
export default apiRouter;
