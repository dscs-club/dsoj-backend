import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../constants/Paths';
import HealthRoutes from './HealthRoutes';
import JudgeRoutes from './SubmissionsRoute';
import SessionRoutes from './SessionRoutes';
import AccountRoutes from './AccountRoutes'


// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();

// **** Judge **** // TODO
apiRouter.post(Paths.Submit.Send, JudgeRoutes.postSubmit);
apiRouter.get(Paths.Submit.List, JudgeRoutes.getSubmissionList);

// **** Health **** //
apiRouter.get(Paths.Health, HealthRoutes.getHealth);

// **** session **** //
apiRouter.post(Paths.Session.Login, SessionRoutes.postLogin);
apiRouter.get(Paths.Session.Logout, SessionRoutes.getLogout);

// **** accounts **** //
apiRouter.post(Paths.Account.Signup, AccountRoutes.postSignup)

// **** Export default **** //
export default apiRouter;
