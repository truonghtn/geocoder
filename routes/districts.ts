import * as express from 'express';
import * as moment from 'moment';
import * as uuid from 'uuid'

import * as C from '../glob/cf';
import HC from '../glob/hc';
import ERR from '../glob/err';
import _ from '../utils/_';
import ajv from '../utils/ajv2';

// Import models here

// Import services here
import AuthServ from '../serv/auth';
import { TILE38 } from '../glob/conn';
import { ITile38Point, IGeoJson, IGeometry } from '../utils/tile38-promisified';

const router = express.Router();
const _ajv = ajv();

// Start API here
let bodyValidator = _ajv({
    '+@lat': 'number|>=-90|<=90',
    '+@lng': 'number|>=-180|<=180'
});
interface IGeoObject {
    key: string;
    latitude: number;
    longitude: number;
}
router.put('/', _.routeAsync(async (req) => {
    const lat: number = req.body.lat;
    const lng: number = req.body.lng;
    const point: ITile38Point = {
        latitude: lat,
        longitude: lng
    }
    const id: string = await uuid.v4();
    const KEY: string = 'LOCATION';
    await TILE38.set_point('LOCATION', id, point);
    const isExpire: boolean = await TILE38.expire(KEY, id, 5);
    if (!isExpire) {
        throw _.logicError('Could not set point', ``, 500, ERR.UNKNOWN, id); 
    }
    const CITIES: string = 'HCM_DISTRICT';
    const listIds: string[] = await TILE38.scan_ids(CITIES);

    for (let i = 0; i <= listIds.length; i++) {
        const listPoints: any[] = await TILE38.within_get(KEY, CITIES, listIds[i]);
        const geoOjects: IGeoObject[] = await Promise.all(listPoints.map(point => {
            const result: IGeoObject = {
                key: point[0],
                latitude: JSON.parse(point[1]).coordinates[1],
                longitude: JSON.parse(point[1]).coordinates[0]
            }
            return result;
        }));
        const abc: IGeoObject[] = _.filter(geoOjects, g => g.key == id);
        if (!_.isEmpty(abc)) {
            return {
                district: listIds[i]
            }
        }
    }

    return {
        district: 'Q.CC'
    }
}));

router.post('/', _.routeAsync(async (req) => {
    const geoJson: IGeoJson = req.body.geoJson;
    const key: string = req.body.key;
    const id: string = req.body.id;
    const result = await TILE38.set_geoJson(key, id, geoJson);
    return { result: result };
}));

export default router;