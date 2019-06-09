
const express =  require("express");
const shopController = require('../controller/shop');
const authController = require('../controller/auth');
const homeController = require('../controller/home');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

router.get('/',isAuth,homeController.getHome);
router.get('/index',shopController.getIndex)
router.get('/login',shopController.getLogin);
router.get('/signup',shopController.getSignup);
router.post('/signup',authController.postSignup);
router.post('/login',authController.postLogin);
module.exports = router;