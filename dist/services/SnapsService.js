const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P((resolve) => { resolve(value); }); }
  return new (P || (P = Promise))((resolve, reject) => {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
let _a;
Object.defineProperty(exports, '__esModule', { value: true });
exports.SnapsService = void 0;
const Snap_model_1 = require('../models/Snap.model');

class SnapsService {
}
exports.SnapsService = SnapsService;
_a = SnapsService;
SnapsService.getAllUserSnaps = (userId) => __awaiter(void 0, void 0, void 0, function* () {
  const snaps = yield Snap_model_1.Snap.find({ userId });
  return snaps;
});
SnapsService.createTripSnap = (snap) => __awaiter(void 0, void 0, void 0, function* () {
  const createdSnap = yield Snap_model_1.Snap.create(snap);
  return createdSnap;
});
