"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/* GET home page. */
router.get('/', function (_req, res) {
    res.render('index', { title: 'Jennifer' });
});
router.get('/home', function (_req, res) {
    res.render('index', { title: 'Home' });
});
router.get('/aminat', function (_req, res) {
    res.render('index', { title: 'Aminat' });
});
router.get('/birin', function (_req, res) {
    res.render('index', { title: 'Bibirinbulu' });
});
exports.default = router;
//# sourceMappingURL=index.js.map