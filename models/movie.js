/**
 * Created by cf on 2017/8/12.
 */
var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie');
var Movie = mongoose.model("Movie",MovieSchema);//注意这个model方法首字母为小写
module.exports = Movie;