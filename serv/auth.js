"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../utils/_");
const err_1 = require("../glob/err");
class AuthServ {
    static authAPIKey(allow) {
        return _1.default.routeNextableAsync((req, resp, next) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body || {};
            const queries = req.query || {};
            const apikey = req.headers['apikey'] || queries['apikey'] || body['apikey'] || '';
            if (apikey != allow) {
                throw _1.default.logicError('Permission denied', 'Invalid apikey', 403, err_1.default.UNAUTHORIZED, apikey);
            }
            next();
        }));
    }
}
exports.AuthServ = AuthServ;
exports.default = AuthServ;
//# sourceMappingURL=auth.js.map