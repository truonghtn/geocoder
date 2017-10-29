import * as redis from 'redis';
import * as bb from 'bluebird';
import * as _ from 'lodash';

export interface ITile38Point {
    latitude: number;
    longitude: number;
}
export type Tile38GeometryType = 'Polygon';
export type Tile38GeoJsonType = 'Feature';

// export interface IGeometry {
//     type: Tile38GeometryType,
//     coordinates: any
// }

// export interface IGeoJson {
//     type: Tile38GeoJsonType,
//     geometry: IGeometry,
//     properties: {
//         OBJECTID: number,
//         f_code: string,
//         Ten_Tinh: string,
//         Ten_Huyen: string,
//         Code_vung: string
//     }
// }

export interface IProperties {
    OBJECTID: number;
    f_code: string;
    Ten_Tinh: string;
    Ten_Huyen: string;
    Dan_So: number;
    Nam_TK: number;
    Code_vung: string;
}
export interface IGeometry {
    type: Tile38GeometryType;
    coordinates: any[];
}
export interface IFeature {
    type: Tile38GeoJsonType;
    properties: IProperties;
    geometry: IGeometry
}

export interface IConnTile38Multi {
    exec(): Promise<any[]>;
}
export interface IConnTile38 {
    set_point(key: string, id: string, point: ITile38Point): Promise<any>;
    set_geoJson(type: string, name: string, geoJsonObject: IFeature): Promise<any>;
    get_point(key: string, id: string): Promise<ITile38Point>;
    within_get(key: string, type: string, name: string): Promise<ITile38Point[]>;
    intersects_get(key: string, id: string, type: string, name: string): Promise<ITile38Point>;
    scan_ids(key: string): Promise<any>;
    expire(key: string, id: string, seconds: number): Promise<boolean>;
}

class ConnTile38 implements IConnTile38 {
    tile38Client: redis.RedisClient;

    constructor(client: redis.RedisClient) {
        this.tile38Client = client;
        this.promisifyFuncs();
    }

    private promisifyFuncs() {
       
    }
    set_point(key: string, id: string, point: ITile38Point): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.tile38Client.send_command('set',[key, id, 'point', point.latitude, point.longitude], (err: any, data: any) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }

    set_geoJson(type: string, name: string, geoJsonObject: IFeature): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.tile38Client.send_command('set',[type, name, 'OBJECT', JSON.stringify(geoJsonObject.geometry)], (err: any, data: any) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }

    get_point(key: string, id: string): Promise<ITile38Point> {
        return new Promise<ITile38Point>((resolve, reject) => {
            this.tile38Client.send_command('get',[key, id], (err: any, data: any) => {
                if (err) {
                    reject(err);
                }
                else {
                    data = JSON.parse(data);
                    const pos: ITile38Point = {
                        latitude: data.coordinates[1],
                        longitude: data.coordinates[0]
                    }
                    resolve(pos);
                }
            });
        });
    }

    within_get(key: string, type: string, name: string): Promise<ITile38Point[]> {
        return new Promise<ITile38Point[]>((resolve, reject) => {
            this.tile38Client.send_command('WITHIN',[key, 'GET', type, name], (err: any, data: any) => {
                if (err) {
                    // reject(err);
                }
                else {
                    resolve(data[1]);
                }
            });
        });
    }

    intersects_get(key: string, id: string, type: string, name: string): Promise<ITile38Point> {
        return new Promise<ITile38Point>((resolve, reject) => {
            this.tile38Client.send_command('INTERSECTS',[key, 'GET', type, name], (err: any, data: any) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }

    scan_ids(key: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.tile38Client.send_command('SCAN',[key, 'IDS'], (err: any, data: any) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data[1]);
                }
            });
        });
    }

    expire(key: string, id: string, seconds: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.tile38Client.send_command('EXPIRE',[key, id, seconds], (err: any, data: number) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data == 1 ? true: false);
                }
            });
        });
    }
};

function Command (command, args, call_on_write?) {
    this.command = command;
    this.args = args;
    this.buffer_args = false;
    this.call_on_write = call_on_write;
}

export class ConnTile38Multi implements IConnTile38Multi{
    tile38Multi: redis.Multi;
    
    constructor(client: redis.Multi) {
        this.tile38Multi = client;
    }

    private send_command(command: string, ...args: any[]) {
        const queue = this['queue'];
        queue.push(new Command(command, args));
    }

    exec(): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            this.tile38Multi.exec((err, ret) => {
                if (!err) {
                    resolve(ret);
                }
                else {
                    reject(err);
                }
            });
        });
    }
}

export function createConnTile38(tile38Client: redis.RedisClient): ConnTile38 {
    return new ConnTile38(tile38Client);
}

export default createConnTile38;