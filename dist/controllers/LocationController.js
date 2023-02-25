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
exports.createLocation = exports.getUserLocations = void 0;
const Location_model_1 = require('../models/Location.model');

const getUserLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
  const { userId } = req.body;
  // find all locations by userId
  const locations = yield Location_model_1.Location.find({ userId });
  // if no locations found, return empty array
  if (!locations) {
    return res.json([]);
  }
  return res.json(locations);
});
exports.getUserLocations = getUserLocations;
const createLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
  const {
    userId, name, address, description, images,
  } = req.body;
    // create new location
  const location = new Location_model_1.Location({
    userId,
    name,
    address,
    description,
    images,
  });
  const savedLocation = yield location.save();
  // return saved location
  return res.json(savedLocation);
});
exports.createLocation = createLocation;
