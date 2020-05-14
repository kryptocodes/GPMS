const express = require('express')
const router = express.Router()

const { getPassById,applyPass,getPass } = require("../controllers/pass");

const {isSignedIn,isAuthenticated} = require("../controllers/auth");
const {getUserById} = require("../controllers/user")


//params
router.param("userId",getUserById)
router.param("passId",getPassById)


//routes
//apply pass
router.post("/pass/apply/:userId",isSignedIn,isAuthenticated,applyPass)

//read pass
router.get("/pass/:passId",getPass)

//delete pass
router.delete("/pass/:passId/:userId",isSignedIn,isAuthenticated,deletePass)


//list pass
router.get("/pass",getPassInfo)


module.exports = router;