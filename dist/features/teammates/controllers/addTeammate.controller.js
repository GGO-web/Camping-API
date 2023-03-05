"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTeammate = void 0;
const teammates_service_1 = require("../teammates.service");
const addTeammate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, teammateId } = req.body;
    yield teammates_service_1.TeammatesService.addTeammate(userId, teammateId);
    return res.json({ message: "Teammate added successfully" });
});
exports.addTeammate = addTeammate;
exports.default = {
    route: exports.addTeammate,
    method: "post",
    path: "/add"
};
