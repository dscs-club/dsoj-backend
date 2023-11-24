import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';
import { ISubmitRequest, ISumbitionResult } from '@src/models/Submission';
import axios from 'axios';
import EnvVars from '@src/constants/EnvVars';
import { JudgeTask } from '@src/models/Judge';

function postSend(req: IReq<ISubmitRequest>, res: IRes) {
    // TODO: get problem data or blanks
    const judgeTask = new JudgeTask(req.body);
    res.sendStatus(HttpStatusCodes.OK);
}

export default {
    postSend,
} as const;
