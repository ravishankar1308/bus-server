const mongoose =require('mongoose');
const Schema =mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const schema = new Schema({
    email:{type:String,required:true},
    name:{type:String,required:true},
    phone:{type:Number,},
    password:{type:String},
    role:{type:Schema.Types.ObjectId, ref:'Role'}
},{timestamps: true})
    .method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

module.exports = mongoose.model('User',schema);
