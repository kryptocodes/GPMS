const express = require('express')
const router = express.Router();


const {getUserById,getUser,getStudent,updateUser,updatePassword} = require("../controllers/user")
const {isSignedIn,isAuthenticated,isWarden} = require("../controllers/auth")

router.param("userId",getUserById)
router.get("/user/:userId",getUser)
router.get("/student/:userId",isSignedIn,isAuthenticated,isWarden,getStudent)
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser)
router.put("/user/update/:userId",isSignedIn,isAuthenticated,updatePassword)

module.exports = router;