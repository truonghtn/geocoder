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

const router = express.Router();
const _ajv = ajv();

// Start API here
let bodyValidator = _ajv({
    '+@room': 'string',
    '+@event': 'string',
    '+args': {
        type: 'array',
        items: {}  
    },
    '++': false
});
router.post('/', AuthServ.authAPIKey(HC.APIKEY), _.validBody(bodyValidator), _.routeAsync(async (req) => {
    const room: string = req.body.room;
    const event: string = req.body.event;
    const args: any[] = req.body.args;

    io.to(room).emit(event, ...args);
}));

export default router;