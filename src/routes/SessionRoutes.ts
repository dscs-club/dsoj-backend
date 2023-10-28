import { Router } from 'express';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import { IReq, IRes } from './types/express/misc';
import { ILoginRes, Iuser } from '@src/models/User';
import { checkBanned, checkHash } from '@src/util/AccountUtils';

import EnvVars from '@src/constants/EnvVars';
import { MongoClient } from 'mongodb';
const mongoURI = EnvVars.DB.URI;
const dbClient = new MongoClient(mongoURI);

function postLogin(req: IReq<Iuser>, res: IRes) {
    const userId = req.body.name;
    const userPassword = req.body.password;
    dbClient.db('Main').collection('Accounts').findOne({ id: userId })
        .then((data) => {
            if (data) {
                const banStatus = checkBanned(data)
                if (banStatus) {
                    res.json(banStatus);
                    return;
                }
                if (data.passwordHash) {
                    checkHash(userPassword ?? '', data.passwordHash)
                        .then(
                            (res) => {
                                if (res) {
                                    const userSessionData: Iuser = {
                                        id: data.id,
                                        name: data.name,
                                    }
                                    req.session.user = userSessionData;
                                }
                            },
                            (err: Error) => {
                                console.error(err);
                            }
                        )
                }
            }
            res.json({
                access: false,
                status: 'LD-1',
                reason: 'Your password is incorrect.'
            } as ILoginRes)
        })
}

function getLogout(req: IReq, res: IRes) {
    console.log(req.session);
    if (req.session)
        req.session.destroy((err) => {
            console.error(err);
        });
    res.redirect('/');
}

export default {
    postLogin,
    getLogout,
} as const;
