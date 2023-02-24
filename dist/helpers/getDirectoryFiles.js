"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDirectoryFiles = void 0;
const fs_1 = require("fs");
const getDirectoryFiles = (source) => (0, fs_1.readdirSync)(source, { withFileTypes: true })
    .map(dirent => dirent.name);
exports.getDirectoryFiles = getDirectoryFiles;
