import * as express from 'express';

import _ from '../utils/_';
import ERR from '../glob/err';

export class AuthServ {
    static authAPIKey(allow: string) {
        return _.routeNextableAsync(async (req, resp, next) => {
            const body: any = req.body || {};
            const queries: any = req.query || {};
            const apikey = req.headers['apikey'] || queries['apikey'] || body['apikey'] || '';
            if (apikey != allow) {
                throw _.logicError('Permission denied', 'Invalid apikey', 403, ERR.UNAUTHORIZED, apikey);
            }

            next();
        });
    }
}

export default AuthServ;