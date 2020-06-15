const mongoose =require('mongoose');
const Schema =mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const schema = new Schema({
    from:{type:Schema.Types.ObjectId, ref:'Location',required: true},
    to:{type:Schema.Types.ObjectId, ref:'Location',required: true},
    driver:{type:Schema.Types.ObjectId, ref:'User',required: true},
    bus:{type:Schema.Types.ObjectId, ref:'Bus',required: true},
    noOfSeat:{type:Number,required: true},
    date:{type:Date,required:true},
    status:{type:String}
},{timestamps: true})
    .method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

module.exports = mongoose.model('Trip',schema);
