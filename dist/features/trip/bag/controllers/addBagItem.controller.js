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
exports.addBagItem = void 0;
const bag_service_1 = require("../bag.service");
const addBagItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tripId } = req.params;
    const bagItem = req.body;
    yield bag_service_1.BagService.addBagItem(tripId, bagItem);
    return res.json({ message: "Bag item added successfully" });
});
exports.addBagItem = addBagItem;
exports.default = {
    route: exports.addBagItem,
    method: "post",
    path: "/:tripId"
};
