import * as express from 'express';
import * as IO from 'socket.io';

import _ from '../utils/_';
import ENV from './env'

// ************ CONFIGS ************

export let io: SocketIO.Server;

export function configureConnections() {
    io = IO(ENV.socketIOPort);
}