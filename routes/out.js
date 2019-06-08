
const express =  require("express");
const shopController = require('../controller/shop');
const router = express.Router();


router.get('/',shopController.getIndex);
router.get('/login',shopController.getLogin);
router.get('/signup',shopController.getSignup);

module.exports = router;