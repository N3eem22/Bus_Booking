const express =  require('express')
const router = express.Router()
//const adminAuth =require('../middleware/admin')
const connection= require('../db/connection');
const authorized = require('../middleware/authorize');
const adminAuth = require('../middleware/admin');
const { body , validationResult} = require('express-validator');
const AllApp ="SELECT * FROM appointments ";
const moment =require('moment');
const util = require("util"); //helper
//  ADMIN [CREATE , UPDATE ,DELETE, LIST]
//get all appointments [ ADMIN , USER ]
router.get("/",
async (req,res)=>{
  const query = util.promisify(connection.query).bind(connection);
    await query("select * from appointment ",(err,results,fields)=>{
      if (err) {
        console.log(err);
      }
        res.json(results);
    });
})

//get spacific appointments => search functioin 
router.get("/:search", authorized, async (req, res) => {
  const { search } = req.params;
  const token = req.headers.token;// Get the user information from the request object
  const query = util.promisify(connection.query).bind(connection);

  try {
    const result = await query("SELECT * FROM appointment WHERE from_location = ? OR to_location = ?", [search, search]);
    if (!result[0]) {
      res.status(404).json({ msg: "No appointment found" });
      const emailResult = await query("SELECT email FROM user WHERE token = ?", [token]);
      const email = emailResult[0].email;
 const searchData = {
        user_email : email,
        search: search
      };
      await query("INSERT INTO search SET ?", searchData)
    } else {
      // Insert the user's search data into the database
      const emailResult = await query("SELECT email FROM user WHERE token = ?", [token]);
      const email = emailResult[0].email;
 const searchData = {
        user_email : email,
        search: search
      };
      await query("INSERT INTO search SET ?", searchData);
      res.json(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});
//Add Appointment
router.post("/", adminAuth,
body("from_location").isString().withMessage("please enter a valid location!").isLength({min:4}).withMessage("enter valid location"),
body("to_location").isString().withMessage("please enter a valid location!").isLength({min:4}).withMessage("enter valid location"),
body("ticket_price").isLength({max:6}).withMessage("please enter a price!"),
body("max_num_of_travelers").isLength({max:6}).withMessage("please enter a number of travellers!")
,body("day").custom(value => {
  value = value.trim();
  if (!moment(value, "YYYY-MM-DD", true).isValid()) {
    throw new Error("Please enter a valid date (YYYY-MM-DD)");
  }
  return true;
}),body("time").custom(value => {
  if (!moment(value, "HH:mm:ss", true).isValid()) {
    throw new Error("Please enter a valid time (HH:mm:ss)");
  }
  return true;
}),

async (req, res) =>{
  try {const data = req.body;
  const query = util.promisify(connection.query).bind(connection);
  const appointment=  {
    from_location: data.from_location,
    to_location: data.to_location,
    ticket_price: data.ticket_price,
    day:data.day,
    time:data.time,
    max_num_of_travelers: data.max_num_of_travelers,
    image :data.image,
    travelers:data.max_num_of_travelers
  };
 await query("insert into appointment set ?",appointment);
 res.status(200).json(appointment);
} catch (err) {
 console.log(err);
 res.status(500).json({ err: err });
}
});
//pUT request --> UPDATE APPOINTMENT
router.put("/:id", adminAuth, [
  body("from_location").isString().withMessage("please enter a valid location!").isLength({min:4}).withMessage("enter valid location"),
  body("to_location").isString().withMessage("please enter a valid location!").isLength({min:4}).withMessage("enter valid location"),
  body("ticket_price").isLength({max:6}).withMessage("please enter a price!"),
  body("max_num_of_travelers").isLength({max:6}).withMessage("please enter a number of travellers!"),
  body("day").custom(value => {
    value = value.trim();
    if (!moment(value, "YYYY-MM-DD", true).isValid()) {
      throw new Error("Please enter a valid date (YYYY-MM-DD)");
    }
    return true;
  }),
  body("time").custom(value => {
    if (!moment(value, "HH:mm:ss", true).isValid()) {
      throw new Error("Please enter a valid time (HH:mm:ss)");
    }
    return true;
  }),
], async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const query = util.promisify(connection.query).bind(connection);

  //VALIDATION REQUEST {EXPRESS VALIDATOR}
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // check appointment exists
    const appointment = await query("SELECT * FROM appointment WHERE id = ?", [id]);
    if (!appointment[0]) {
      return res.status(404).json({
        msg: "Appointment not found!",
      });
    }

    // update the appointment
    const updatedAppointment = {
      from_location: req.body.from_location,
      to_location: req.body.to_location,
      ticket_price: req.body.ticket_price,
      day: req.body.day,
      time: req.body.time,
      max_num_of_travelers: req.body.max_num_of_travelers,
      image: req.body.image,
      travelers:req.body.max_num_of_travelers
    };
    await query("UPDATE appointment SET ? WHERE id = ?", [updatedAppointment, id]);

    res.json({
      message: "Appointment updated",
      updatedAppointment: updatedAppointment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to update appointment",
    });
  }
});
  
//delete request --> remove spasific Appointment
router.delete("/:id", adminAuth, (req, res) => {
  const { id } = req.params;

  connection.query("DELETE FROM appointment WHERE id = ?", id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        message: "Failed to delete appointment",
      });
    } else if (results.affectedRows === 0) {
      res.status(404).json({
        message: "Appointment not found",
      });
    } else {
      res.json({
        message: "Appointment deleted",
      });
    }
  });
});


module.exports =router;