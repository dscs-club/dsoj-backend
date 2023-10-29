import { IReq, IRes } from './types/express/misc';
import { ISignupForm, Iuser } from '@src/models/User';

import { genUniqueId } from '@src/util/RandomUtils';
import SystemResStatus from '@src/constants/SystemResStatus';
import IdentityCode from '@src/constants/IdentityCode';
import { genHash } from '@src/util/SessionUtils';
import EnvVars from '@src/constants/EnvVars';
import { MongoClient } from 'mongodb';

const mongoURI = EnvVars.DB.URI;
const dbClient = new MongoClient(mongoURI);

function postSignup(req: IReq<ISignupForm>, res: IRes) {
    const userData = req.body;
    const userName = userData.name;
    const userEmail = userData.email;
    const userPassword = userData.password;
    if (!userData || !userName || !userEmail || !userPassword) {
        res.json(SystemResStatus.NORMAL.INPUT_BLANK);
        return;
    }
    const userId = genUniqueId(dbClient.db('Main').collection('user'));
    genHash(userPassword ?? '')
        .then((userPasswordHash: any) => {
            const user: Iuser = {
                id: userId,
                name: userName,
                passwordHash: userPasswordHash ?? '',
                email: userEmail,
                identity: IdentityCode.CommunityUser,
                banned: false,
            }
            dbClient.db('Main').collection('Accounts').insertOne(user)
                .catch(err => console.error(err))
            res.json(SystemResStatus.SIGNUP.OK);
        })
}

export default {
    postSignup
} as const