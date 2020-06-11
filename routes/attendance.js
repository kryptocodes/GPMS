const express = require('express')
const router = express.Router()

const { getAttenById, addAtten, getAtten } = require("../controllers/attendance")
const { isSignedIn, isAuthenticated} = require("../controllers/auth");
const { getUserById } = require("../controllers/user")


//params
router.param("attenId",getAttenById)
router.param("userId",getUserById)



//routes
//register attendance
router.post("/attendance/:userId",isSignedIn,isAuthenticated,getUserById,addAtten)


//display
router.get("/attendance",getAtten)








module.exports = router;