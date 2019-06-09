const bcrypt = require('bcryptjs');
const User = require('../models/user');


const { validationResult } = require('express-validator/check'); 

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name  = req.body.name;

    const errors = validationResult(req);
    if(!(password===req.body.confirmPassword))
    {
      return res.render('out/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: "Password and confirm Password dont match",
        oldInput: {
          email: email,
          password: password,
          confirmPassword: req.body.confirmPassword,
          name: req.body.name
        },
        validationErrors: errors.array()
      });
    }
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).render('out/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: errors.array()[0].msg,
        oldInput: {
          email: email,
          name: req.body.name,
          password: password,
          confirmPassword: req.body.confirmPassword
        },
        validationErrors: errors.array()
      });
    }
  
    bcrypt
      .hash(password, 12)
      .then(hashedPassword => {
        const user = new User({
            name:name,
          email: email,
          password: hashedPassword,
          cart: { items: [] }
        });
        return user.save();
      })
      .then(result => {
        res.redirect('/login');
        // return transporter.sendMail({
        //   to: email,
        //   from: 'shop@node-complete.com',
        //   subject: 'Signup succeeded!',
        //   html: '<h1>You successfully signed up!</h1>'
        // });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  };



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
        }
        bcrypt
          .compare(password, user.password)
          .then(doMatch => {
            if (doMatch) {
              req.session.isLoggedIn = true;
              req.session.user = user;
              return req.session.save(err => {
                console.log(err);
                res.redirect('/');
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