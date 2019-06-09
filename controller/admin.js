const bcrypt = require('bcryptjs');
const User = require('../models/user');


const { validationResult } = require('express-validator/check'); 


exports.getAdmin = (req,res,next) =>{


    res.render('admin/admin');
}

exports.getLogin = (req,res,next)=>{
    res.render('out/login',{
        errorMessage : '',
        oldInput : ''
    });
}

exports.getViewProduct = (req,res,next) =>{


    res.render('admin/view-product');
}
exports.getAddProduct = (req,res,next) =>{


    res.render('admin/add-product');
}


exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render('out/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: errors.array()[0].msg,
        oldInput: {
          email: email,
          password: password
        },
        validationErrors: errors.array()
      });
    }
  
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          return res.redirect('/login');
        }
        bcrypt
          .compare(password, user.password)
          .then(doMatch => {
            if (doMatch) {
              req.session.isLoggedIn = true;
              req.session.user = user;
              return req.session.save(err => {
                console.log(err);
                res.redirect('/admin');
              });
            }
            return res.status(422).render('out/login', {
              path: '/login',
              pageTitle: 'Login',
              errorMessage: 'Invalid email or password.',
              oldInput: {
                email: email,
                password: password
              },
              validationErrors: []
            });
          })
          .catch(err => {
            console.log(err);
            res.redirect('/login');
          });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  };


  exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
      console.log(err);
      res.redirect('/index');
    });
  };