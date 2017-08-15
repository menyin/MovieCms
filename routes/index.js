var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');

/*主页*/
router.get('/', function (req, res, next) {
    //var user = req.session.user;
    //res.render('index', {title: '首页',user:user});
    res.render('index', {title: '首页'});
});
/*登录*/
router.get('/login', function (req, res, next) {
    res.render('login', {title: '登录页'});
});
router.post('/login', function (req, res, next) {
    req.session.user = {uerId: 123, uerName: '陈南阳'};
    res.redirect('/');
});
/*电影增加*/
router.get('/movie/new', function (req, res, next) {
    res.render('movie_new', {title: '新增电影'});
});
router.post('/movie/new', function (req, res, next) {
    /* var movieObj=req.body.movie*/
    var movieNew = new Movie({
        doctor: req.body.doctor,
        title: req.body.title,
        language: req.body.language,
        country: req.body.country,
        summary: req.body.summary,
        flash: req.body.flash,
        poster: req.body.poster,
        year: req.body.year
    });
    movieNew.save(function (err) {
        if (!err) {
            res.redirect('http://www.baidu.com/');
        }
    });
});
/*电影删除*/
router.get('/movie/delete/:id', function (req, res, next) {
    var id = req.params.id;
    Movie.remove({_id:id}, function (err) {
        if (err) {
            console.log('数据请求错误');
            res.render('global_error', {error: {title: '数据请求错误'}});
        } else {
            res.redirect('/movie/list');
        }
    });
});
/*电影更改*/
router.get('/movie/update/:id', function (req, res, next) {
    var id = req.params.id;
    Movie.findOne({_id:id}, function (err, movie) {
        if (err) {
            console.log('数据请求错误');
            res.render('global_error', {error: {title: '数据请求错误'}});
        } else {
            res.render('movie_update', {title: '电影详情', movie: movie});
        }
    });
});
router.post('/movie/update', function (req, res, next) {
    Movie.update({_id:req.body.id},{$set:{
        doctor: req.body.doctor,
        title: req.body.title,
        language: req.body.language,
        country: req.body.country,
        summary: req.body.summary,
        flash: req.body.flash,
        poster: req.body.poster,
        year: req.body.year
    }}, function (err) {
        if (err) {
            console.log('数据请求错误');
            res.render('global_error', {error: {title: '数据请求错误'}});
        } else {
            res.redirect('/movie/details/'+req.body.id);
        }
    });
});
/*电影查看*/
router.get('/movie/details/:id', function (req, res, next) {
    var id = req.params.id;
    Movie.findOne({_id:id}, function (err, movie) {
        if (err) {
            console.log('数据请求错误');
            res.render('global_error', {error: {title: '数据请求错误'}});
        } else {
            res.render('movie_details', {title: '电影详情', movie: movie});
        }
    });
});
router.get('/movie/list', function (req, res, next) {
    Movie.find({}, function (err, movies) {
        if (err) {
            console.log('数据请求错误');
            res.render('mongoose_test1', {title: 'mongoose测试页', movies: null});
        } else {
            res.render('movie_list', {title: '电影列表', movies: movies});
        }
    });
});

/*测试母版页和部分视图*/
router.get('/testLayout', function (req, res, next) {
    res.render('testLayout', {
        title: '测试母版功能',
        layout: '_layout',
        items: ['Marico', 'Lily', 'Lucy', 'Jimmy'],
        partialsParam: {title: '部分视图参数2', index: '002'}
    });
});

/*测试mongoose建模操作数据库*/
router.get('/mongoose/find', function (req, res, next) {
    debugger;
    Movie.find({title: '测试mongoose标题'}, function (err, movies) {
        if (err) {
            console.log('数据请求错误');
            return;
        }
        debugger;
        res.render('mongoose_test1', {title: 'mongoose测试页', movies: movies});
    });
});
router.get('/mongoose/save', function (req, res, next) {
    debugger;
    var _movie = new Movie({
        doctor: 'test_doctor',
        title: '测试mongoose标题',
        language: 'test_language',
        country: 'test_country',
        summary: 'test_summary',
        flash: 'test_flash',
        poster: 'test_poster',
        year: '1998'
    });
    _movie.save(function (err, movie) {
        if (err) {
            console.log(err);
        }
        debugger;
        res.render('mongoose_test1', {title: 'mongoose测试页', movies: [movie]});
    });
});
module.exports = router;
