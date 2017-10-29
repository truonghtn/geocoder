
import { TILE38 } from "../glob/conn";
import { IFeature } from "../utils/tile38-promisified";
var fs = require('fs');

export let FEATURES: IFeature[];
export async function initGeoJson(pathFile: string) {
    const objJSON = JSON.parse(await fs.readFileSync(pathFile, 'utf8'));
    FEATURES = objJSON.features;

    const results = await Promise.all(FEATURES.map(async f => {
        return {
            Ten_Tinh: f.properties.Ten_Tinh,
            Ten_Huyen: f.properties.Ten_Huyen,
            Status: await TILE38.set_geoJson(f.properties.Ten_Tinh, f.properties.Ten_Huyen, f) 
        };
    }));
    console.log(results);
}