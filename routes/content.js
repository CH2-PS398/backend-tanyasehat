const express = require('express');
const router = express.Router();

// import database
const connection = require('../config/database');
const { body, validationResult } = require('express-validator');

/**
 * INDEX CONTENT
 */

router.get('/', (req, res) => {
  connection.query('SELECT * FROM content ORDER BY contentId ASC', (err, rows) => {
    if(err) {
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      });

    } else {
      return res.status(200).json({
        status: true,
        message: 'List Learning Content',
        data: rows
      });
    }
  });
});

/**
 * STORE CONTENT
 */

router.post('/store', [

  //validation
  body('image').notEmpty(),
  body('title').notEmpty(),
  body('desc_one').notEmpty(),
  body('desc_two').notEmpty(),
  body('desc_three').notEmpty(),
  body('desc_four').notEmpty(),
  body('desc_five').notEmpty(),
  body('desc_six').notEmpty()
    
], (req, res) => {
    
    const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }
    
        //define formData
        let formData = {
          image: req.body.image,
          title: req.body.title,
          desc_one: req.body.desc_one,
          desc_two: req.body.desc_two,
          desc_three: req.body.desc_three,
          desc_four: req.body.desc_four,
          desc_five: req.body.desc_five,
          desc_six: req.body.desc_six 
        }
    
        // insert query
    connection.query('INSERT INTO content SET ?', formData, function (err, rows) {
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
 * SHOW CONTENT
 */

router.get('/:id', function (req, res) {
  let id = req.params.id;

  connection.query(`SELECT * FROM content WHERE contentId = ${id}`, function (err, rows) {
    if(err) {
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      });
    }

    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Content Not Found!',
      });

    } else {
      return res.status(200).json({
        status: true,
        message: 'Detail Data Learning Content',
        data: rows[0]
      });
    };
  });
});

/**
 * UPDATE CONTENT
 */

router.patch('/update/:id', [

  //validation
  body('image').notEmpty(),
  body('title').notEmpty(),
  body('desc_one').notEmpty(),
  body('desc_two').notEmpty(),
  body('desc_three').notEmpty(),
  body('desc_four').notEmpty(),
  body('desc_five').notEmpty(),
  body('desc_six').notEmpty()

], (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      return res.status(422).json({
          errors: errors.array()
      });
  }

  //id content
  let id = req.params.id;

  //data content
  let formData = {
    image: req.body.image,
    title: req.body.title,
    desc_one: req.body.desc_one,
    desc_two: req.body.desc_two,
    desc_three: req.body.desc_three,
    desc_four: req.body.desc_four,
    desc_five: req.body.desc_five,
    desc_six: req.body.desc_six
  }

  // update query
  connection.query(`UPDATE content SET ? WHERE contentId = ${id}`, formData, function (err, rows) {
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
  });
});

/**
 * DELETE CONTENT
 */
router.delete('/delete/(:id)', function(req, res) {

  let id = req.params.id;

  connection.query(`DELETE FROM content WHERE contentId = ${id}`, function(err, rows) {
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
