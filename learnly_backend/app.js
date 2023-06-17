
import 'dotenv/config'
import express from 'express';
import morgan from 'morgan';
import cors from 'cors' 
import path  from 'path'
import db from './config/dbConnect.js'
import userRouter from './Routers/userRouter.js'
import adminRouter from "./Routers/adminRouter.js"
import tutorRouter from './Routers/tutorRouter.js'
import multer from 'multer';

const app = express();

app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.resolve() +"/public"))
// app.use(express.static(path.join(__dirname, 'public')));
app.use( 
  cors({
    origin : [process.env.CLIENT_URL],
    methods : ["GET","POST" , "DELETE" ,"PUT" , "PATCH"] ,
    credentials: true  
  })
);


db();

const PORT = process.env.PORT || 5000


app.use("/" , userRouter)
app.use("/admin" , adminRouter)
app.use("/tutor" , tutorRouter)

// multer Errror
app.use(( err ,req , res , next) => {
 if(err instanceof multer.MulterError) {
  // A multer error occured when uploading image
  if(err.code === 'LIMIT_FILE_TYPE') {
    res.status(400).json({ message : err.message });
  }else{
    res.status(500).json({ message: err.message });
  }
 }else{
  res.status(500).json({ message: "Unknown error occured" });
 }
})

app.listen(PORT ,()=>{
  console.log(`Server Running on Port${PORT}` );
})

