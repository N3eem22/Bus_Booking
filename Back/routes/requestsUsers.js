const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../db/connection");
const util = require("util"); //helper
const authorized = require("../middleware/authorize");
const adminAuth =require('../middleware/admin')
//Traveler post request
router.post("/", authorized, async (req, res) => {
  try {
    const { appointment_id } = req.body;
    const token = req.headers.token;
    const query = util.promisify(connection.query).bind(connection);
    const emailResult = await query("SELECT email FROM user WHERE token = ?", [
      token,
    ]);
    const email = emailResult[0].email;
    const request={
        appointment_id: appointment_id,
        request: "pending",
        traveler_id: email
    }
   await  query("INSERT INTO travelerappointment SET ?", [request])
   res.status(200).json("request success");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
})  

//view requests by user
  router.get("/",authorized, async (req, res) => {
    try{
    const token = req.headers.token;
    const query = util.promisify(connection.query).bind(connection);
    const emailResult = await query("SELECT email FROM user WHERE token = ?", [token]);
    const email = emailResult[0].email;
    const results = await query("select * from search where user_email = ?", [email]);
    const requests = await query("SELECT * FROM travelerappointment WHERE traveler_id = ?",[email]);
    res.status(202).json(requests);
    }
    catch(err){
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;