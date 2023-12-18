const express = require('express');
const router = express.Router();

// import database
const connection = require('../config/database');
const { body, validationResult } = require('express-validator');

/**
 * INDEX SUNDANESE
 */

router.get('/', (req, res) => {
  connection.query('SELECT * FROM sundanese ORDER BY id ASC', (err, rows) => {
    if(err) {
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      });

    } else {
      return res.status(200).json({
        status: true,
        message: 'List Sundanese Word',
        data: rows
      });
    }
  });
});

/**
 * STORE SUNDANESE
 */

router.post('/store', [

  //validation
  body('word').notEmpty(),
  body('mean').notEmpty()
    
], (req, res) => {
    
    const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }
    
        //define formData
        let formData = {
          word: req.body.word,
          mean: req.body.mean
        }
    
        // insert query
    connection.query('INSERT INTO sundanese SET ?', formData, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
              status: false,
              message: 'Internal Server Error',
            })
        } else {
            return res.status(201).json({
              status: true,
              message: 'Insert Word Successfully!',
              data: rows[0]
            })
        }
    });
});

/**
 * SHOW SUNDANESE
 */

router.get('/:id', function (req, res) {
  let id = req.params.id;

  connection.query(`SELECT * FROM sundanese WHERE id = ${id}`, function (err, rows) {
    if(err) {
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      });
    }

    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Sundanese Word Not Found!',
      });

    } else {
      return res.status(200).json({
        status: true,
        message: 'Detail Data Sundanese Word',
        data: rows[0]
      });
    };
  });
});

/**
 * UPDATE SUNDANESE
 */

router.patch('/update/:id', [

  //validation
  body('word').notEmpty(),
  body('mean').notEmpty()

], (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      return res.status(422).json({
          errors: errors.array()
      });
  }

  //id sundanese word
  let id = req.params.id;

  //data sundanese word
  let formData = {
    word: req.body.word,
    mean: req.body.mean
  }

  // update query
  connection.query(`UPDATE sundanese SET ? WHERE id = ${id}`, formData, function (err, rows) {
      //if(err) throw err
      if (err) {
          return res.status(500).json({
              status: false,
              message: 'Internal Server Error',
          })
      } else {
          return res.status(200).json({
              status: true,
              message: 'Update Word Successfully!'
          })
      }
  })

});

/**
 * DELETE SUNDANESE
 */

router.delete('/delete/(:id)', function(req, res) {

  let id = req.params.id;

  connection.query(`DELETE FROM sundanese WHERE id = ${id}`, function(err, rows) {
      //if(err) throw err
      if (err) {
          return res.status(500).json({
              status: false,
              message: 'Internal Server Error',
          })
      } else {
          return res.status(200).json({
              status: true,
              message: 'Delete Word Successfully!',
          })
      }
  })
});

module.exports = router;