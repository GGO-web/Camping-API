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
exports.updateBagImage = void 0;
const asyncWrapper_1 = require("../../../../helpers/asyncWrapper");
const withController_1 = require("../../../../helpers/withController");
const bag_service_1 = require("../bag.service");
const updateBagImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, bagItemId, image } = req.body;
    yield bag_service_1.BagService.updateBagImage(userId, bagItemId, image);
    return res.json({ message: "Bag item image updated successfully" });
});
exports.updateBagImage = updateBagImage;
exports.default = [
    (0, withController_1.withController)("/image", "patch", (0, asyncWrapper_1.asyncWrapper)(exports.updateBagImage))
];
