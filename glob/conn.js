"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IO = require("socket.io");
const env_1 = require("./env");
function configureConnections() {
    exports.io = IO(env_1.default.socketIOPort);
}
exports.configureConnections = configureConnections;
//# sourceMappingURL=conn.js.map