import EnvVars from '@src/constants/EnvVars';
import { Collection } from 'mongodb';

import { MongoClient } from 'mongodb';
const mongoURI = EnvVars.DB.URI;
const dbClient = new MongoClient(mongoURI);

export function genUniqueId(collection: Collection) {
    let randomId = (Math.random() + 1).toString(10).substring(7);
    collection.findOne({ id: randomId })
        .then((data) => {
            if(!data){
                return;
            }
            randomId = genUniqueId(collection);
        })
    return randomId;
}
