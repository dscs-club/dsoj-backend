import { IReq, IRes } from './types/express/misc';
import { ISignupForm, Iuser } from '@src/models/User';

import { genUniqueId } from '@src/util/RandomUtils';
import SystemResStatus from '@src/constants/SystemResStatus';
import IdentityCode from '@src/constants/IdentityCode';
import { genHash } from '@src/util/SessionUtils';
import EnvVars from '@src/constants/EnvVars';
import { MongoClient } from 'mongodb';

const mongoURI = EnvVars.DB.URI;
const mongo = new MongoClient(mongoURI);

// TODO: add admin verification
// TODO: check email repeatability
async function postSignup(req: IReq<ISignupForm>, res: IRes) {
    const userData = req.body;
    const userName = userData.name;
    const userEmail = userData.email;
    const userPassword = userData.password;
    let ifContinue = true;
    if (!userData || !userName || !userEmail || !userPassword) {
        res.json(SystemResStatus.NORMAL.INPUT_BLANK);
        ifContinue = false;
        return;
    }
    await mongo.db('Main').collection('Accounts').findOne({ name: userName })
        .then((data) => {
            if (data != undefined) {
                res.json(SystemResStatus.SIGNUP.NAME_TAKEN);
                ifContinue = false;
                return;
            }
        })
    if (!ifContinue) return;
    // TODO: userId should be a constant
    genUniqueId(mongo.db('Main').collection('user'))
        .then(
            (userId) => {
                genHash(userPassword ?? '')
                    .then((userPasswordHash: any) => {
                        const user: Iuser = {
                            id: userId as string,
                            name: userName,
                            passwordHash: userPasswordHash ?? '',
                            email: userEmail,
                            identity: IdentityCode.CommunityUser,
                            banned: false,
                        }
                        mongo.db('Main').collection('Accounts').insertOne(user)
                            .catch(err => console.error(err))
                        res.json(SystemResStatus.SIGNUP.OK);
                    })
            }
        )
}

export default {
    postSignup
} as const