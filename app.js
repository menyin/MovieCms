var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var index = require('./routes/index');
var users = require('./routes/users');
var session = require('express-session'); //如果要使用session，需要单独包含这个模块
var cookieParser = require('cookie-parser'); //如果要使用cookie，需要显式包含这个模块
//var mongoStore = require("connect-mongo")(session); //express4 的写法详见参考connect-mongo API
var mongoStore = require("connect-mongodb-session")(session); //express4 的写法详见参考connect-mongo API
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost/MovieCms';
mongoose.connect(dbUrl);
/*var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('openUri', function (callback) {
  console.log('数据库连接错误');
});*/
var partials = require('express-partials');//母版功能
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());//初始化母版功能




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
/*app.use(bodyParser.json());*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({//使用教程详见博客园收藏《express-session使用理解》
  //name: "cny",//话说是设置一个session的范围，测试了再说吧
  secret: "cny",//相当于一个用于加密sessionId的秘钥
  resave: false,//??是否允许session重新设置，要保证session有操作的时候必须设置这个属性为true
  saveUninitialized: false,//??是否设置session在存储容器中可以给修改
  //cookie: { secure: true },
  store: new mongoStore({
    uri: dbUrl,
    collection: 'mySessions'
  })
  /*store: new mongoStore({//会有问题，放弃使用
    url: dbUrl,
    auto_reconnect: true,//issue 推荐解决方法
    collection: "huihua"//session原名
  })*/
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
