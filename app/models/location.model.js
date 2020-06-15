const mongoose =require('mongoose');
const Schema =mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const schema = new Schema({
    locationName:{type:String,required:true,unique:true}
},{timestamps: true})
    .method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

module.exports = mongoose.model('Location',schema);
