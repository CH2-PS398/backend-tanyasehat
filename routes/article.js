const express = require('express');
const router = express.Router();

// import database
const connection = require('../config/database');
const { body, validationResult } = require('express-validator');

/**
 * INDEX ARTICLE
 */

router.get('/', (req, res) => {
  connection.query('SELECT * FROM article ORDER BY id_article ASC', (err, rows) => {
    if(err) {
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      });

    } else {
      return res.status(200).json({
        status: true,
        message: 'List Article',
        data: rows[0]
      });
    }
  });
});

/**
 * STORE ARTICLE
 */

router.post('/store', [

  //validation
  body('image').notEmpty(),
  body('title').notEmpty(),
  body('paragraph_one').notEmpty(),
  body('paragraph_two').notEmpty(),
  body('paragraph_three').notEmpty(),
  body('paragraph_four').notEmpty(),
  body('paragraph_five').notEmpty(),
  body('paragraph_six').notEmpty()
    
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
          paragraph_one: req.body.paragraph_one,
          paragraph_two: req.body.paragraph_two,
          paragraph_three: req.body.paragraph_four,
          paragraph_four: req.body.paragraph_four,
          paragraph_five: req.body.paragraph_five,
          paragraph_six: req.body.paragraph_six 
        }
    
        // insert query
    connection.query('INSERT INTO article SET ?', formData, function (err, rows) {
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
 * SHOW ARTICLE
 */

router.get('/:id', function (req, res) {
  let id = req.params.id;

  connection.query(`SELECT * FROM article WHERE id_article = ${id}`, function (err, rows) {
    if(err) {
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      });
    }

    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Article Not Found!',
      });

    } else {
      return res.status(200).json({
        status: true,
        message: 'Detail Data Article',
        data: rows[0]
      });
    };
  });
});

/**
 * UPDATE ARTICLE
 */

router.patch('/update/:id', [

  //validation
  body('image').notEmpty(),
  body('title').notEmpty(),
  body('paragraph_one').notEmpty(),
  body('paragraph_two').notEmpty(),
  body('paragraph_three').notEmpty(),
  body('paragraph_four').notEmpty(),
  body('paragraph_five').notEmpty(),
  body('paragraph_six').notEmpty()

], (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      return res.status(422).json({
          errors: errors.array()
      });
  }

  //id article
  let id = req.params.id;

  //data post
  let formData = {
    image: req.body.image,
    title: req.body.title,
    paragraph_one: req.body.paragraph_one,
    paragraph_two: req.body.paragraph_two,
    paragraph_three: req.body.paragraph_three,
    paragraph_four: req.body.paragraph_four,
    paragraph_five: req.body.paragraph_five,
    paragraph_six: req.body.paragraph_six
  }

  // update query
  connection.query(`UPDATE article SET ? WHERE id_article = ${id}`, formData, function (err, rows) {
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
 * DELETE ARTICLE
 */
router.delete('/delete/(:id)', function(req, res) {

  let id = req.params.id;

  connection.query(`DELETE FROM article WHERE id_article = ${id}`, function(err, rows) {
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
