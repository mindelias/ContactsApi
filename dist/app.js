"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
// import indexRouter from './routes/index';
const contact_1 = __importDefault(require("./routes/contact"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = express_1.default();
mongoose_1.default.connect('mongodb://localhost:27017/Contacts', { useUnifiedTopology: true, useNewUrlParser: true }).then(() => console.log('connect sucessfully')).catch(err => console.log(err));
// view engine setup
app.set('views', path_1.default.join(__dirname, '../', 'views'));
app.set('view engine', 'ejs');
// Body Parser
app.use(express_1.default.urlencoded({ extended: false }));
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../', 'public')));
// app.use('/', indexRouter);
app.use('/api', contact_1.default);
// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, _next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
//# sourceMappingURL=app.js.map