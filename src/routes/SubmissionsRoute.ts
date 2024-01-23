import { IReq, IRes } from './types/express/misc';
import { ISubmitRequest, ISubmission } from '@src/models/Submission';
import axios from 'axios';
import EnvVars from '@src/constants/EnvVars';
import { MongoClient } from 'mongodb';
import SystemResStatus from '@src/constants/SystemResStatus';

const mongoURI = EnvVars.DB.URI;
const mongo = new MongoClient(mongoURI);

function postSubmit(req: IReq<ISubmitRequest>, res: IRes) {
    const submitRequest: ISubmitRequest = req.body;
    mongo.db('Judge').collection('Problems').findOne({ id: submitRequest.problemId })
        .then(async (data) => {
            if (data === null) {
                return res.json(SystemResStatus.SUMBIT.PROBLEM_NOT_FOUND);
            }
            else {
                const submission: ISubmission = {
                    id: await mongo.db('Judge').collection('Submissions').countDocuments() + 1,
                    problemId: submitRequest.problemId,
                    userId: submitRequest.userId,
                    code: submitRequest.code,
                    language: submitRequest.language,
                    status: 'Pending',
                    time: 0,
                    memory: 0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                mongo.db('Judge').collection('Submissions').insertOne(submission);
                mongo.db('Judge').collection('Problems').updateOne({ id: submitRequest.problemId }, { $inc: { challenged: 1 } });
                console.log("New Submission: \n", submitRequest);
                // TODO: communicate with judge server

                return res.json(SystemResStatus.SUMBIT.OK);
            }
        })
}

function getSubmissionList(req: IReq, res: IRes) {
    mongo.db('Judge').collection('Submissions').find({}).toArray()
        .then((data) => {
            return res.json(data);
        })
}

export default {
    postSubmit,
    getSubmissionList
} as const;
