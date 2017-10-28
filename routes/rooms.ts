import * as express from 'express';
import * as moment from 'moment';

import * as C from '../glob/cf';
import HC from '../glob/hc';
import ERR from '../glob/err';
import { io } from '../glob/conn';
import _ from '../utils/_';
import ajv from '../utils/ajv2';

// Import models here

// Import services here
import AuthServ from '../serv/auth';
import * as SocketServ from '../serv/socketIO';

const router = express.Router();
const _ajv = ajv();

// Start API here
router.post('/:room/clients/:client_id', AuthServ.authAPIKey(HC.APIKEY), _.routeAsync(async (req) => {
    const room: string = req.params.room;
    const clientId: string = req.params.client_id;

    const client = io.sockets.sockets[clientId];
    if (client) {
        client.join(room);
    }

    return HC.SUCCESS;
}));

export default router;