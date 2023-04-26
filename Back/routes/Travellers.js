const { v4 } = require('uuid');
const express = require('express')
const router = express.Router()
const adminAuth =require('../middleware/admin')
const connection= require('../db/connection')


 

// API requests
// get request --> retrive data from server
// post request --> saving data
// put request --> updata data
// delete --> delete data from server

//get request--> get all travellers
router.get("/",  (req, res)=> {
    connection.query("select * from user ",(err,results,fields)=>{
        res.json(results);
    });
});
//post request --> create  User
router.post("/",(req,res)=>{
    const data = req.body;
   connection.query("insert into user set ? ",{ email:data.email ,phone: data.phone, status:data.status, type:data.type ,password :data.password},(err,results,fields)=>{
    if (err) {
        res.statusCode=404;
        res.send([{
            "message":"failed to save the user"
        }]);
    } else {
        res.json({
            "message":"user created"
        })
    }
   })
});
// get spasific user
router.get("/:email",  (req, res)=> {
    const {email} = req.params;
   connection.query("select * from user where email = ?",email,(err,results,fields)=>{
    if (results[0] ) {
        res.json(results[0]);

    } else {

        res.statusCode=404;
        res.send([{
            "message":"no Users found"
       
        }]);    }
   } );

  });

//pUT request --> UPDATE User
router.put("/:email", (req, res) => {
    const { email } = req.params;
    const { phone, password } = req.body;
  
    connection.query(
      "UPDATE user SET phone = ?, password = ? WHERE email = ?",
      [phone, password,email],
      (err, results) => {
        if (err) {
          res.statusCode = 500;
          res.json({ message: "Failed to update Traveler" });
        } else {
          res.json("Traveler updated");
        }
      }
    );
  });
//delete request --> remove spasific User
router.delete("/:email",(req,res)=>{
    const {email} = req.params;
   connection.query("delete from user where email = ?",email,(err,results)=>{
    if (err) {
        res.statusCode=500;
        res.json({
            "message":"field to delete"
        })
    } else {
        res.json({
            "message":"User deleted"
        })
    }
   })
});



module.exports = router;
/*
const movieIndex = Movies.findIndex((item)=>item.id == id);
    if (movieIndex == -1) {
        res.statusCode=404;
        res.send([{
            "message":"user not found"
        }]);
    } else {
        Movies[movieIndex].name =data.name;
        Movies[movieIndex].description =data.description;
        res.json(Movies[movieIndex]);

    }
*/