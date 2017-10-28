"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conn_1 = require("../glob/conn");
class SocketIOServ {
    static init() {
        conn_1.io.on('connection', (client) => {
            console.log(`Client connected: ${client.id}`);
            client.on('disconnect', () => {
                console.log(`Client disconnected: ${client.id}`);
            });
        });
    }
}
exports.SocketIOServ = SocketIOServ;
exports.default = SocketIOServ;
//# sourceMappingURL=socketIO.js.map