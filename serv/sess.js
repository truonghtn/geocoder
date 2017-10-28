"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createSesssionObject() {
    return (req, resp, next) => {
        req.session = {};
        next();
    };
}
exports.default = createSesssionObject;
//# sourceMappingURL=sess.js.map