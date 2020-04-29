var express = require('express');
var router = express.Router();
const { check,validationResult } = require('express-validator');
const {signout,signin, isSignedIn} = require("../controllers/auth");
/*router.get("/signout",(req,res)=>{
    res.send("user signout");
});*/

router.post(
    "/signin",
    [
      check("email", "email is required").isEmail(),
      check("password", "password field is required").isLength({ min: 1 })
    ],
    signin
);
  
router.get("/signout",signout);

router.get("/backend",isSignedIn,(req,res)=>{
  res.json(req.auth)
});

module.exports = router;