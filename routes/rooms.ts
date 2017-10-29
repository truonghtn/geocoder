import * as express from 'express';
import * as moment from 'moment';

import * as C from '../glob/cf';
import HC from '../glob/hc';
import ERR from '../glob/err';
import _ from '../utils/_';
import ajv from '../utils/ajv2';

// Import models here

// Import services here
import AuthServ from '../serv/auth';

const router = express.Router();
const _ajv = ajv();

// Start API here
router.post('/:room/clients/:client_id', AuthServ.authAPIKey(HC.APIKEY), _.routeAsync(async (req) => {

    return HC.SUCCESS;
}));

export default router;