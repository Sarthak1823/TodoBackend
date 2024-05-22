import mongoose from "mongoose";

const Todo=new mongoose.Schema(
    {
        "TodoSerial":{
            type:Number,
            require:true
        },
        "TodoName":{
            type:String,
            require:true
         },
         "TodoDescription":{
            type:String,
            require:true
         }
    }
)
const userSchema=new mongoose.Schema({
    "name":{
       type:String,
       require:true,
    },
    "email":{
        type:String,
        require:true,
        unique:true
     },
     "todo":[Todo]

})

const User=mongoose.model("User",userSchema);

export {User};