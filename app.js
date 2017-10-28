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
const express = require("express");
const bodyParser = require("body-parser");
const env_1 = require("./glob/env");
const conn_1 = require("./glob/conn");
const sess_1 = require("./serv/sess");
const socketIO_1 = require("./serv/socketIO");
// Import routers
const events_1 = require("./routes/events");
const rooms_1 = require("./routes/rooms");
class Program {
    static main() {
        return __awaiter(this, void 0, void 0, function* () {
            env_1.default.configure();
            yield conn_1.configureConnections();
            socketIO_1.default.init();
            const server = express();
            server.use(bodyParser.json());
            // create session object
            server.use(sess_1.default());
            // CORS
            server.all('*', function (req, res, next) {
                res.header('Access-Control-Allow-Origin', "*");
                res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, DELETE');
                res.header('Access-Control-Allow-Credentials', 'true');
                res.header('Access-Control-Max-Age', '86400');
                res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, ' +
                    'Content-Type, Accept, Authentication, Authorization, sess');
                if (req.method.toUpperCase() == 'OPTIONS') {
                    res.statusCode = 204;
                    res.send();
                    return;
                }
                next();
            });
            server.use('/events', events_1.default);
            server.use('/rooms', rooms_1.default);
            // Start server
            server.listen(env_1.default.port, function () {
                console.log("Listen on port " + env_1.default.port + " ...");
            });
            return 0;
        });
    }
}
Program.main();
//# sourceMappingURL=app.js.map