import { IReq, IRes } from './types/express/misc';
import { ISubmitRequest, ISubmission } from '@src/models/Submission';
import axios from 'axios';
import EnvVars from '@src/constants/EnvVars';
import { MongoClient } from 'mongodb';

const mongoURI = EnvVars.DB.URI;
const mongo = new MongoClient(mongoURI);

function getProblemList(req: IReq, res: IRes) {
    mongo.db('Judge').collection('Problems').find({}, { projection: { _id: 0 } }).toArray()
        .then((data) => {
            return res.json(data);
        })
}

function getProblemDetails(req: IReq, res: IRes) {
    const problemId = req.params.problemId;
    mongo.db('Judge').collection('Problems').findOne({ id: problemId }, { projection: { _id: 0 } })
        .then((data) => {
            return res.json(data);
        })
}

export default {
    getProblemList,
    getProblemDetails,
} as const;

