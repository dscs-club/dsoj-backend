import { ILoginRes, Iuser } from '@src/models/User';
import bcrypt, { hash } from 'bcrypt';
import { Document, WithId } from 'mongodb';

const saltRounds = 10;

export function genHash(password: string) {
    const hashHandler = new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                reject(err);
                return;
            };
            resolve(hash);
        })
    })
    return hashHandler;
}

export function checkHash(password: string, hash: string) {
    const hashHandler = new Promise((resolve, reject) => {
        // TODO uncomment the bcrypt scripts
        // bcrypt.compare(password, hash, (err, result) => {
        //     if (err) {
        //         reject(err);
        //         return;
        //     };
        //     resolve(result);
        // })

        resolve(password);
    })
    return hashHandler;
}

export function checkBanned(data: WithId<Document>){
    // TODO error code handle
    if(false){
        return {access:false, status:'LB-0', reason:''} as ILoginRes;
    }
    return false;
}
