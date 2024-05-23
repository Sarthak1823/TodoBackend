import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import { User } from './models/user.models.js';
const app = express();
import cors from 'cors';
app.use(cors());

// app.use(cors(
//   {
//      origin:["https://todo-frontend-mu-three.vercel.app"],
//      methods:["POST","GET","USE"],
//      credentials:true
//   }
// ));
const connectDB=async ()=>{
  await mongoose.connect("mongodb+srv://Admin:Sarthak1823@cluster0.pr3yfqy.mongodb.net/")
  .then(
    ()=>console.log("Database Connected"))
  // .catch(
  //   ()=>console.log("Error while connecting to Database"));
}
connectDB();
// Use middleware to parse JSON in the request body
app.use(bodyParser.json());
app.get('/',(req,res)=>{
   res.send("Hello");
})
app.use('/api/', async (req, res) => {
   const {name,email}=req.body;
   
   await User.create(
     {
        "name":name,
        "email":email
     }
   )
     return res
     .status(200)
     .json({
      message: 'Completed successfully'
  });
});
app.use('/todo',async (req,res)=>{
   const {email,todo,description,serial}=req.body;


   const newTodo={
    "TodoName":todo,
     "TodoDescription":description,
     "TodoSerial":serial
   }

   const user=await User.findOne(
       {"email":email}
   )
  
    user.todo.push(newTodo);
  await user.save();
 
  return res
  .status(201)
  .json({
    meassage:"Todo Added Successfully (AddTodo)",
    "user":user
  })
})
 
app.use('/show',async (req,res)=>{
    const {email}=req.body;
     if (!email){
        return res.
        status(400)
        .json({
        status:400,
        message:"Add the Email"
       })
    }
    const user=await User.findOne({"email":email});
     const todos_list=user.todo;
     return res
     .status(200)
     .json({
      meassage:"All the todos Sent sucessfully",
      todos:todos_list
     })
})

app.use('/delete',async (req,res)=>{
  const {id,email}=req.body;
   
  if (!email || !id){
    return res.
    status(400)
    .json({
    status:400,
    message:"Provide the credentials"
   })
}
 
const user=await User.findOne({email:email});
 let  todos_list=user.todo;
 todos_list=todos_list.filter((todo)=>{
  return todo._id.toString() !==id.toString() ;
 })
  
 user.todo=todos_list;
 await user.save();
 
 return res
 .status(201)
 .json({
  meassage :"Given Todo Deleted successfully",
  todos:todos_list
 })

})
const port=process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/api`);
});
