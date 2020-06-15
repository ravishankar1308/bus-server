const mongoose =require('mongoose');
const Schema =mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const schema = new Schema({
    trip:{type:Schema.Types.ObjectId, ref:'Trip',required: true},
    seatNo:{type:Array,required: true,unique:true},
    ticketStatus:{type:String}
},{timestamps: true})
    .plugin(uniqueValidator)
    .method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });


module.exports = mongoose.model('Ticket',schema);
