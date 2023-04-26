const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../db/connection");
const util = require("util"); //helper
const authorized = require("../middleware/authorize");
const adminAuth =require('../middleware/admin')
//Admin put request
router.put("/", adminAuth, async (req, res) => {
    try {
      const { status } = req.body;
      const {id} = req.headers;
      const query = util.promisify(connection.query).bind(connection);
      const idApps = await query("select appointment_id from travelerappointment where id =?",[id]);
      const  idApp =  idApps[0].appointment_id;
      const travelersResults=  await  query("select travelers from appointment where id =?", [idApp]);
      let traveler = travelersResults[0].travelers;
      if (traveler == 0) {
        res.status(404).json("no sets left");
      }
      else{
      
      if (status == "accepted" || status == "declined") {
         if (status == "accepted") {
            const query = util.promisify(connection.query).bind(connection);
            traveler = traveler-1;
            await  query("update appointment set travelers = ? where id = ? ", [traveler,idApp])
            
        }
      const query = util.promisify(connection.query).bind(connection);
      await query("UPDATE travelerappointment SET request = ? WHERE id = ?", [status, id]);
      res.status(200).json({ message: "Appointment request updated successfully" }); } 
      else {
        res.status(500).json({msg : "enter a valid status"});
      }
  
    }
     
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

router.get("/",adminAuth, async (req, res) => {
    try{
    const query = util.promisify(connection.query).bind(connection);
    const requests = await query("SELECT * FROM travelerappointment ");
    res.status(202).json(requests);
    }
    catch(err){
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  module.exports = router;