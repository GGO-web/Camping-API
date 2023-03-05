"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidImageFormat = void 0;
const isBase64 = require("is-base64");
const isValidImageFormat = (image) => isBase64(image, {
    mimeRequired: true,
    allowEmpty: false,
});
exports.isValidImageFormat = isValidImageFormat;
