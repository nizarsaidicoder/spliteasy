"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    jwt: {
        secret: process.env.JWT_SECRET || 'dev-secret',
        expiresIn: '1y',
    },
});
//# sourceMappingURL=auth.config.js.map