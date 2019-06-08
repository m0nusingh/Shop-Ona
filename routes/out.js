
const express =  require("express");
const shopController = require('../controller/shop');
const authController = require('../controller/auth');
const router = express.Router();


router.get('/',shopController.getIndex);
router.get('/login',shopController.getLogin);
router.get('/signup',shopController.getSignup);
router.post('/signup',authController.postSignup);
router.post('/login',authController.postLogin);
module.exports = router;