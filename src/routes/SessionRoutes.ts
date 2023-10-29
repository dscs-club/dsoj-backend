import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import { IReq, IRes } from './types/express/misc';
import { ILoginForm, ISessionData } from '@src/models/User';

import EnvVars from '@src/constants/EnvVars';
import { MongoClient } from 'mongodb';
import SystemResStatus from '@src/constants/SystemResStatus';
import { checkBanned, compareHash } from '@src/util/SessionUtils';
const mongoURI = EnvVars.DB.URI;
const dbClient = new MongoClient(mongoURI);

function postLogin(req: IReq<ILoginForm>, res: IRes) {
    const userName = req.body.name;
    const userPassword = req.body.password;

    // check if req is a blank form
    if (!userName || !userPassword) {
        // console.log(2);
        res.json(SystemResStatus.LOGIN.INPUT_BLANK);
        return;
    }
    dbClient.db('Main').collection('Accounts').findOne({ name: userName })
        .then((data) => {
            if (data != undefined) {
                const banStatus = checkBanned(data);
                if (banStatus) {
                    // console.log(1);
                    res.json(banStatus);
                    return;
                }
                if (data.passwordHash != undefined) {
                    compareHash(userPassword ?? '', data.passwordHash)
                        .then(
                            (r: any) => {
                                if (r) {
                                    const userSessionData: ISessionData = {
                                        id: userName,
                                        name: userName,
                                        identity: data.identity,
                                    }
                                    // console.log(3);
                                    res.json(SystemResStatus.LOGIN.OK);
                                    req.session.user = userSessionData;
                                    return;
                                } else {
                                    res.json(SystemResStatus.LOGIN.INPUT_INCORRECT);
                                    return;
                                }
                            },
                            (err: Error) => {
                                // console.log(4);
                                console.error(err);
                                res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
                                return;
                            }
                        )
                }
            } else {
                // console.log(5);
                res.json(SystemResStatus.LOGIN.INPUT_INCORRECT);
                return;
            }
        })
}

function getLogout(req: IReq, res: IRes) {
    // console.log(req.session);
    if (req.session.user != undefined)
        req.session.destroy((err) => {
            console.error(err);
        });
    res.redirect('/');
}

export default {
    postLogin,
    getLogout,
} as const;
