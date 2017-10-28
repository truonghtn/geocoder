"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ENV_NAME;
(function (ENV_NAME) {
    ENV_NAME[ENV_NAME["PRODUCTION"] = 0] = "PRODUCTION";
    ENV_NAME[ENV_NAME["STAGING"] = 1] = "STAGING";
    ENV_NAME[ENV_NAME["DEVELOPMENT"] = 2] = "DEVELOPMENT";
})(ENV_NAME = exports.ENV_NAME || (exports.ENV_NAME = {}));
class Enviroment {
    constructor() {
        this.env = ENV_NAME.DEVELOPMENT;
        this.port = 3254;
        this.socketIOPort = 3255;
        this.redisHost = 'localhost';
        this.redisPort = 6379;
    }
    configure() {
        const env = (process.env.NODE_ENV || '').toLowerCase();
        if (env == 'prod' || env == 'production') {
            this.env = ENV_NAME.PRODUCTION;
        }
        else if (env == 'stag' || env == 'staging') {
            this.env = ENV_NAME.STAGING;
        }
        else {
            this.env = ENV_NAME.DEVELOPMENT;
        }
    }
}
;
exports.ENV = new Enviroment();
exports.default = exports.ENV;
//# sourceMappingURL=env.js.map