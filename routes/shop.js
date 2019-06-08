


const express =  require("express");
const  homeController = require('../controller/home');
const router = express.Router();


router.get('/home',homeController.getHome);


module.exports = router;