const express = require('express')
const router = express.Router()

const { getPassById,createHomePass,getPass,getUserPass,getFacultyPass,getAllPass,deletePass} = require("../controllers/pass");
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
router.get("/pass/userpass/:userId",isSignedIn,isAuthenticated,getUserPass)
router.get("/pass/student/:userId",isSignedIn,isAuthenticated,getFacultyPass)
router.get("/pass",getAllPass)

//delete pass
router.delete("/pass/delete/:passId/:userId",isSignedIn,isAuthenticated,deletePass)

//list pass


module.exports = router;