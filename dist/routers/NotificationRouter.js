const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.NotificationRouter = void 0;
const express_1 = __importDefault(require('express'));
const NotificationController_1 = require('../controllers/NotificationController');
const asyncWrapper_1 = require('../helpers/asyncWrapper');

const router = express_1.default.Router();
// Notification routes
router.get('/all/:userId', (0, asyncWrapper_1.asyncWrapper)(NotificationController_1.getAllNotifications));
router.post('/create', (0, asyncWrapper_1.asyncWrapper)(NotificationController_1.createNotification));
router.delete('/delete/:id', (0, asyncWrapper_1.asyncWrapper)(NotificationController_1.deleteNotification));
exports.NotificationRouter = router;
