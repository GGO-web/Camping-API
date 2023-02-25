"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDirectories = void 0;
const fs_1 = require("fs");
const getDirectories = (source) => (0, fs_1.readdirSync)(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
exports.getDirectories = getDirectories;
