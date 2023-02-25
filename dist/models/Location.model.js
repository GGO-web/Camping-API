Object.defineProperty(exports, '__esModule', { value: true });
exports.Location = void 0;
const mongoose_1 = require('mongoose');

const locationSchema = new mongoose_1.Schema({
  // _id field is predefined by mongoose
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: (Array), required: true },
  address: { type: String },
  userId: { type: String, required: true },
  tripId: { type: String, required: true },
});
exports.Location = (0, mongoose_1.model)('locations', locationSchema);
