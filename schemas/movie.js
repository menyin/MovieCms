/**
 * Created by cf on 2017/8/12.
 */
var mongoose=require('mongoose');
var MovieSchema = new mongoose.Schema({
    doctor:String,
    title:String,
    language:String,
    country:String,
    summary:String,
    flash:String,
    poster:String,
    year:String,
    meta:{
        creatAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});
MovieSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.creatAt=this.meta.updateAt=Date.now();
    }else {
        this.meta.updateAt = Date.now();
    }
    next();
});
/*MovieSchema.statics = {
    fetch: function (callback) {
        return this.find({}).sort('meta.updateAt').exec(callback);
    },
    findById: function (id,callback) {
        return this.findOne({_id:id}).exec(callback);
    }
};*/
module.exports = MovieSchema;