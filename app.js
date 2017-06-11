/*Author: A1 & A3*/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var ejs = require('ejs');
var redisStore = require('connect-redis')(session)
var randomstring = require('randomstring')

var redis = require('./models/Redisdb');
var index = require('./routes/index');
var login = require('./routes/login');
var users = require('./routes/users');
var edit = require('./routes/edit');
var regist = require('./routes/regist');
var main = require('./routes/main');
var logout = require('./routes/logout');
var editmainpage = require('./routes/editmainpage');
var mainpage = require('./routes/mainpage');
var password = require('./routes/password');
var orders = require('./routes/orders');
var userstock = require('./routes/userstock');
var traderecord = require('./routes/traderecord');
var discard = require('./routes/discard');
var loss = require('./routes/loss');
//管理员界面
var mainManage = require('./routes/mainManage');
var mainManage_AdminInfo = require('./routes/mainManage_AdminInfo');
var mainManage_logout = require('./routes/mainManage_logout');
//开户管理
var openAccountManage = require('./routes/openAccountManage');
var openApplyDetail = require('./routes/openApplyDetail');
var openApplyPass = require('./routes/openApplyPass');
var openApplyReject = require('./routes/openApplyReject');
//挂失管理
var lossReportManage = require('./routes/lossReportManage');
var lossReportDetail = require('./routes/lossReportDetail');
var lossResult = require('./routes/lossResult');
var lossDisResult = require('./routes/lossDisResult');
//管理员交易系统管理
var tradeManage_stock = require('./routes/tradeManage_stock');
var tradeManage_user = require('./routes/tradeManage_user');
//销户管理
var closeAccountManage = require('./routes/closeAccountManage');
var closeInfoPage = require('./routes/closeInfoPage');
var closePass = require('./routes/closePass');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.ejs',ejs.__express);
app.set('view engine', 'ejs');
// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 设置 Session

app.use(session({
    store: new redisStore({
        client: redis.client
    }),
    secret: randomstring.generate({
        length: 128,
        charset: 'alphabetic'
    }),
    cookie: {
        maxAge: 60000*10000000
    },
    resave: true,
    saveUninitialized: true
}));


app.use('/', index);
app.use('/login',login);
app.use('/users', users);
app.use('/logout', logout);
app.use('/edit', edit);
app.use('/regist', regist);
app.use('/main', main);
app.use('/editmainpage', editmainpage);
app.use('/mainpage', mainpage);
app.use('/traderecord', traderecord);
app.use('/password', password);
app.use('/orders', orders);
app.use('/userstock', userstock);
app.use('/discard', discard);
app.use('/loss', loss);
//管理员界面
app.use('/mainManage', mainManage);
app.use('/mainManage_AdminInfo', mainManage_AdminInfo);
app.use('/mainManage_logout', mainManage_logout);
//开户管理
app.use('/openAccountManage', openAccountManage);
app.use('/openApplyDetail',openApplyDetail);
app.use('/openApplyPass',openApplyPass);
app.use('/openApplyReject',openApplyReject);
//挂失管理
app.use('/lossReportManage', lossReportManage);
app.use('/lossReportDetail', lossReportDetail);
app.use('/lossResult',lossResult);
app.use('/lossDisResult',lossDisResult);
//管理员交易系统管理
app.use('/tradeManage_stock',tradeManage_stock);
app.use('/tradeManage_user',tradeManage_user);
//销户管理
app.use('/closeAccountManage',closeAccountManage);
app.use('/closeInfoPage',closeInfoPage);
app.use('/closePass',closePass);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
