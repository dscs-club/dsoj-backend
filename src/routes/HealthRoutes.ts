import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';


// **** Functions **** //

function getHealth(_: IReq, res: IRes) {
  res.status(HttpStatusCodes.OK).send('OK');
}

// **** Export default **** //

export default {
  getHealth,
} as const;
