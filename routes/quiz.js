const express = require('express');
const router = express.Router();

// import database
const connection = require('../config/database');
const { body, validationResult } = require('express-validator');

/**
 * INDEX QUIZ
 */

router.get('/', (req, res) => {
  connection.query('SELECT * FROM quiz ORDER BY id ASC', (err, rows) => {
    if(err) {
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      });

    } else {
      return res.status(200).json({
        status: true,
        message: 'List Data Quiz',
        data: rows
      });
    }
  });
});

/**
 * STORE QUIZ
 */

router.post('/store', [

  //validation
  body('question').notEmpty(),
  body('correct_answer').notEmpty(),
  body('incorrect_answer1').notEmpty(),
  body('incorrect_answer2').notEmpty(),
  body('incorrect_answer3').notEmpty(),
  body('level').notEmpty(),
  body('point').notEmpty(),
  body('experience').notEmpty()
    
], (req, res) => {
    
    const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }
    
        //define formData
        let formData = {
          question: req.body.question,
          correct_answer: req.body.correct_answer,
          incorrect_answer1: req.body.incorrect_answer1,
          incorrect_answer2: req.body.incorrect_answer2,
          incorrect_answer3: req.body.incorrect_answer3,
          level: req.body.level,
          point: req.body.point,
          experience: req.body.experience 
        }
    
        // insert query
    connection.query('INSERT INTO quiz SET ?', formData, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
              status: false,
              message: 'Internal Server Error',
            })
        } else {
            return res.status(201).json({
              status: true,
              message: 'Insert Data Successfully',
              data: rows[0]
            })
        }
    });
});

/**
 * SHOW QUIZ
 */

router.get('/:id', function (req, res) {
  let id = req.params.id;

  connection.query(`SELECT * FROM quiz WHERE id = ${id}`, function (err, rows) {
    if(err) {
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      });
    }

    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Quiz Not Found!',
      });

    } else {
      return res.status(200).json({
        status: true,
        message: 'Detail Data Quiz',
        data: rows[0]
      });
    };
  });
});

/**
 * UPDATE QUIZ
 */

router.patch('/update/:id', [

  //validation
  body('question').notEmpty(),
  body('correct_answer').notEmpty(),
  body('incorrect_answer1').notEmpty(),
  body('incorrect_answer2').notEmpty(),
  body('incorrect_answer3').notEmpty(),
  body('level').notEmpty(),
  body('point').notEmpty(),
  body('experience').notEmpty()

], (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      return res.status(422).json({
          errors: errors.array()
      });
  }

  //id quiz
  let id = req.params.id;

  //data post
  let formData = {
    question: req.body.question,
    correct_answer: req.body.correct_answer,
    incorrect_answer1: req.body.incorrect_answer1,
    incorrect_answer2: req.body.incorrect_answer2,
    incorrect_answer3: req.body.incorrect_answer3,
    level: req.body.level,
    point: req.body.point,
    experience: req.body.experience
  }

  // update query
  connection.query(`UPDATE quiz SET ? WHERE id = ${id}`, formData, function (err, rows) {
      //if(err) throw err
      if (err) {
          return res.status(500).json({
              status: false,
              message: 'Internal Server Error',
          })
      } else {
          return res.status(200).json({
              status: true,
              message: 'Update Data Successfully!'
          })
      }
  })

});

/**
 * DELETE QUIZ
 */
router.delete('/delete/(:id)', function(req, res) {

  let id = req.params.id;

  connection.query(`DELETE FROM quiz WHERE id = ${id}`, function(err, rows) {
      //if(err) throw err
      if (err) {
          return res.status(500).json({
              status: false,
              message: 'Internal Server Error',
          })
      } else {
          return res.status(200).json({
              status: true,
              message: 'Delete Data Successfully!',
          })
      }
  })
});


module.exports = router;