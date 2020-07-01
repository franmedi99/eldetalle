const {Schema, model} =require('mongoose');

const TransactionSchema= new Schema({
    product:{type: String,required: true},
    date: {type:String,required:true},
    transaction: {type:Number,required:true},
    tipo: {type:String, required:true},
    user:{type:String,required:true}
   
},


    {timestamps:true}
)

module.exports = model('Transaction', TransactionSchema); 