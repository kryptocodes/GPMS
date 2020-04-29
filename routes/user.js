const express = require('express')
const router = express.Router();


const {getUserById,getUser,updateUser} = require("../controller/user")
const {isSignedIn,isAuthenicated,isFaculty} = require("../controller/faculty")

router.param("userId",getUserById)


module.exports = router