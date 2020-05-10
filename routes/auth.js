var express = require('express');
var router = express.Router();
const { check,validationResult } = require('express-validator');
const {signout,signup,signup_faculty,signin, isSignedIn} = require("../controllers/auth");
/*router.get("/signout",(req,res)=>{
    res.send("user signout");
});*/

router.post(
    "/signin",
    [
      check("username", "username is required").isEmail(),
      check("password", "password field is required").isLength({ min: 1 })
    ],
    signin
);

router.post("/signup_faculty",[
  check("name","Name should be atleast 3 Character") .isLength({ min: 3 }),
  check("email","E-mail is required").isEmail(),
  check("password","Password should be atleast 8 Character").isLength({ min: 8 })
],signup);

router.post("/signup",[
  check("name","Name should be atleast 3 Character") .isLength({ min: 3 }),
  check("email","E-mail is required").isEmail(),
  check("Room No","Room no is required").isNumeric(),
  check("Roll No","Roll no is required").isNumeric().isLength({min: 10}),
  check("password","Password should be atleast 8 Character").isLength({ min: 8 })
],signup);
  
router.get("/signout",signout);

router.get("/backend",isSignedIn,(req,res)=>{
  res.json(req.auth)
});

module.exports = router;