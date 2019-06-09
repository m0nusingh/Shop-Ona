


const express =  require("express");
const router = express.Router();
const  adminController =  require('../controller/admin');
const isAuth = require('../middleware/is-auth');

router.get('/',isAuth,adminController.getAdmin);
router.post('/login',adminController.postLogin);
router.get('/logout',adminController.postLogout);
router.get('/login',adminController.getLogin);
router.get('/add-product',adminController.getAddProduct);
router.get('/view-product',adminController.getViewProduct);

module.exports = router;
