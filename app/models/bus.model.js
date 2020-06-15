const mongoose =require('mongoose');
const Schema =mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const schema = new Schema({
    busName:{type:String,required:true,unique:true},
    type:{type:String},
    busNumber:{type:String,required: true,unique:true}
},{timestamps: true})
    .plugin(uniqueValidator)
    .method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

module.exports = mongoose.model('Bus',schema);
