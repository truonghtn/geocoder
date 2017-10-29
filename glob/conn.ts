import * as express from 'express';
// import * as tile38 from 'tile38';
import * as redis from 'redis';
import _ from '../utils/_';
import ENV from './env'
import * as ConnTile38 from '../utils/tile38-promisified';
// ************ CONFIGS ************

export let TILE38: ConnTile38.IConnTile38;

export function configureConnections() {
    TILE38 = ConnTile38.createConnTile38(redis.createClient(9851, "localhost"));
}