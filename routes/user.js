const express = require('express')
const router = express.Router();


const {getUserById,getUser,updateUser,updatePassword} = require("../controllers/user")
const {isSignedIn,isAuthenticated} = require("../controllers/auth")

router.param("userId",getUserById)
router.get("/user/:userId",getUser)
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser)
router.put("/user/update/:userId",isSignedIn,isAuthenticated,updatePassword)

module.exports = router;