const mongoose =require('mongoose');
const Schema =mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const schema = new Schema({
    from:{type:Schema.Types.ObjectId, ref:'Location'},
    to:{type:Schema.Types.ObjectId, ref:'Location'},
    driver:{type:Schema.Types.ObjectId, ref:'User'},
    bus:{type:Schema.Types.ObjectId, ref:'Bus'},
    noOfSeat:{type:String},
    date:{type:String},
    status:{type:String}
},{timestamps: true})
    .method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

module.exports = mongoose.model('Trip',schema);
