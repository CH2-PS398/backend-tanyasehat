const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const uuid = require('uuid');

// import database
const connection = require('../config/database');
const { body, validationResult } = require('express-validator');

router.post('/register', [

  //validation
  body('name').notEmpty(),
  body('email').notEmpty(),
  body('password').notEmpty(),
  
], (req, res) => {
  
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }


  let hashedPassword = bcrypt.hashSync(req.body.password, 10);
  let token = uuid.v4();

  //define formData
  let formData = {
    name: req.body.name,
    email: req.body.email,  
    password: hashedPassword,
    token: token,
    created_at: new Date(),
    updated_at: new Date()
  }

  console.log(formData); // check formData

  // check if email is already registered
  connection.query('SELECT * FROM users WHERE email = ?', req.body.email, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      });
    } else {
      if (rows.length > 0) {
        return res.status(400).json({
          status: false,
          message: 'Email is already registered!'
        });
      } else {
        // insert query
        connection.query('INSERT INTO users SET ?', formData, function (err, rows) {
          if (err) {
            return res.status(500).json({
              status: false,
              message: 'Internal Server Error',
            });
          } else {
            return res.status(201).json({
              status: true,
              message: 'Insert Data Successfully',
              data: rows[0]
            });
          }
        });
      }
    }
  });
});


router.post('/login', function (req, res) {
  let email = req.body.email;
  let password = req.body.password;

  // check if email
  connection.query('SELECT * FROM users WHERE email = ?', email, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      });
    } else {
      if (rows.length === 0) {
        return res.status(400).json({
          status: false,
          message: 'Email or Password does not match!'
        });
      } else {
        // compare the password
        bcrypt.compare(password, rows[0].password, function (err, result) {
          if (err) {
            return res.status(500).json({
              status: false,
              message: 'Internal Server Error',
            });
          } else {
            if (result) {
              const { password, created_at, updated_at, ...userData } = rows[0];
              return res.status(200).json({
                status: true,
                message: 'Login Successful',
                data: userData
              });
            } else {
              return res.status(400).json({
                status: false,
                message: 'Email or Password does not match!'
              });
            }
          }
        });
      }
    }
  });
});



router.get('/users/:id', function (req, res) {
  let id = req.params.id;

  connection.query(`SELECT name, email, created_at FROM users WHERE userId = ${id}`, function (err, rows) {
    if(err) {
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      });
    }

    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: 'Data User Not Found!',
      });

    } else {
      return res.status(200).json({
        status: true,
        message: 'User Details',
        data: rows[0]
      });
    };
  });
});


module.exports = router;

