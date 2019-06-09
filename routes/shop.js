


const express =  require("express");
const  homeController = require('../controller/home');
const authController  =  require('../controller/auth');
const router = express.Router();



router.get('/logout',authController.postLogout);

module.exports = router;