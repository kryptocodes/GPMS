const express = require('express')
const router = express.Router()

const { getPassById,createHomePass,getPass,getAllPass } = require("../controllers/pass");
const {isSignedIn,isAuthenticated} = require("../controllers/auth");
const {getUserById} = require("../controllers/user")


//params
router.param("userId",getUserById)
router.param("passId",getPassById)


//routes
//apply pass
router.post("/pass/homepass/:userId",isSignedIn,isAuthenticated,createHomePass)

//read pass
router.get("/pass/:passId",getPass)
router.get("/pass",getAllPass)

//delete pass


//list pass


module.exports = router;