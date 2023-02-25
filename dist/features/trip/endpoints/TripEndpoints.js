const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P((resolve) => { resolve(value); }); }
  return new (P || (P = Promise))((resolve, reject) => {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteTrip = exports.completeTrip = exports.getActivatedTrip = exports.deactivateTrip = exports.activateTrip = exports.createTrip = exports.getAllUserTrips = void 0;
const TripService_1 = require('../../../services/TripService');
// Trip endpoints
const getAllUserTrips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
  const { userId } = req.params;
  const trips = yield TripService_1.TripService.getAllUserTrips(userId);
  return res.json(trips);
});
exports.getAllUserTrips = getAllUserTrips;
const createTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
  const trip = req.body;
  const savedTrip = yield TripService_1.TripService.createTrip(trip);
  return res.json(savedTrip);
});
exports.createTrip = createTrip;
const activateTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
  const { userId, tripId } = req.body;
  yield TripService_1.TripService.activateTrip(userId, tripId);
  return res.json({ message: 'Trip activated successfully' });
});
exports.activateTrip = activateTrip;
const deactivateTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
  const { userId } = req.params;
  yield TripService_1.TripService.deactivateTrip(userId);
  return res.json({ message: 'Trip deactivated successfully' });
});
exports.deactivateTrip = deactivateTrip;
const getActivatedTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
  const { userId } = req.params;
  const trip = yield TripService_1.TripService.getActivatedTrip(userId);
  return res.json(trip);
});
exports.getActivatedTrip = getActivatedTrip;
const completeTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
  const { userId } = req.params;
  const savedTrip = yield TripService_1.TripService.completeTrip(userId);
  return res.json({
    message: `Trip with id ${savedTrip === null || savedTrip === void 0 ? void 0 : savedTrip.get('_id')} completed successfully`,
  });
});
exports.completeTrip = completeTrip;
const deleteTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
  const { userId, tripId } = req.query;
  yield TripService_1.TripService.deleteTrip(userId, tripId);
  return res.json({ message: 'Trip deleted successfully' });
});
exports.deleteTrip = deleteTrip;
