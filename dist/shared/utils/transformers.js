"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToLowerCase = void 0;
const class_transformer_1 = require("class-transformer");
const ToLowerCase = () => (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? value.toLowerCase() : value);
exports.ToLowerCase = ToLowerCase;
//# sourceMappingURL=transformers.js.map