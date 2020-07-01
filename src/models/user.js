const {Schema, model } = require('mongoose');
// const bcrypt= require('bcryptjs');

const UserSchema= new Schema({
    client: {type:String, required: true, default:0},
    username: {type:String, required: true},
    email: {type:String, required: true},
    phone: {type:String, required: true},
    home: {type:String, required: true},
    random: {type:Number, required: true, default:0}
},
{timestamps:true});


module.exports = model('User',UserSchema);