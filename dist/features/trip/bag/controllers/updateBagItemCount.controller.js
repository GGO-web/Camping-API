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
exports.updateBagItemCount = void 0;
const bag_service_1 = require("../bag.service");
const updateBagItemCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, bagItemId, count } = req.body;
    yield bag_service_1.BagService.updateBagItemCount(userId, bagItemId, count);
    return res.json({ message: "Bag item count has been updated successfully" });
});
exports.updateBagItemCount = updateBagItemCount;
exports.default = {
    route: exports.updateBagItemCount,
    method: "patch",
    path: "/count",
};
