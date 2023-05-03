const express = require("express");
const router = express.Router();
const util = require("util"); //helper
const connection= require('../db/connection')


const adminAuth=async (req,res,next)=>{
  const {token} =req.headers;
  const query = util.promisify(connection.query).bind(connection); 

  const admin =await query("select * from user where token = ?",[token]);
  const isAdmin = admin[0].type;
   if (admin && isAdmin === "admin") {
     next();
   } else {
     res.statuscode=404;
     res.send([{
        "message":"You are not authorized to enter this rout !"
     }]);
   }
}
module.exports= adminAuth;
