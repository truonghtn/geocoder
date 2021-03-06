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
import { ITile38Point, IFeature, IGeometry } from '../utils/tile38-promisified';
import { FEATURES } from '../serv/initGeoJson';

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
router.get('/location/:location', AuthServ.authAPIKey(HC.APIKEY), _.routeAsync(async (req) => {
    const strLocation: string = req.params.location;
    const location: string[] = _.split(strLocation, ',');
    const point: ITile38Point = {
        latitude: parseFloat(location[1]),
        longitude: parseFloat(location[0])
    }
    const id: string = await uuid.v4();
    const KEY: string = 'LOCATION';
    await TILE38.set_point('LOCATION', id, point);
    const isExpire: boolean = await TILE38.expire(KEY, id, 10);
    if (!isExpire) {
        throw _.logicError('Could not set point', ``, 500, ERR.UNKNOWN, id); 
    }
    for (let k = 0; k < FEATURES.length; k++) {
        const CITIY: string = FEATURES[k].properties.Ten_Tinh;
        const listIds: string[] = await TILE38.scan_ids(CITIY);
    
        for (let i = 0; i < listIds.length; i++) {
            const listPoints: any[] = await TILE38.within_get(KEY, CITIY, listIds[i]);
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
    }

    return {
        district: 'NONE'
    }
}));

// router.post('/', _.routeAsync(async (req) => {
//     const geoJson: IFeature = req.body.geoJson;
//     const key: string = req.body.key;
//     const id: string = req.body.id;
//     const result = await TILE38.set_geoJson(key, id, geoJson);
//     return { result: result };
// }));

export default router;