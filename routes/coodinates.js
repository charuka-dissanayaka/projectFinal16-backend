const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Coodinate = require('../models/coodinate');

router.post('/', (req, res, next) => {
    const coodinate_ = new Coodinate({
        _id: new mongoose.Types.ObjectId(),
        qualityCheckerID: req.body.qualityCheckerID,
        coordinates: req.body.coordinates,
        createdDate: req.body.createdDate,
        imageUrl : req.body.imageUrl,
    });

    coodinate_.save().then(result => {
        console.log(result);
        res.status(201).json({
            data: result,
            message:'Created'
        })
    })

});

router.get('/', (req, res, next) => {
    Coodinate.find()
    .exec()
    .then(data => {
        if(data.length >0) {
            console.log(data);
            res.status(200).json(data);
        } else {
            res.status(404).json({
                error: {
                    message: 'Coodinates Document NOT FOUND'
                }
            })
        }
       
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: {
                message: err
            }
        })
    })
})

router.get('/:coodinateId', (req, res, next) => {
    const id = req.params.coodinateId;
    Coodinate.find({qualityCheckerID: id})
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json(doc);
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        // console.log(err);
        res.status(500).json({ error: err, message: 'No' });
      });
});
router.get('/view/:coodinateId', (req, res, next) => {
    const id = req.params.coodinateId;
    Coodinate.findById(id)
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json(doc);
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        // console.log(err);
        res.status(500).json({ error: err, message: 'No' });
      });
});

router.delete('/:coodinateId', (req, res, next) => {
    const id = req.params.availablilityId;
    Coodinate.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'coodinate deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/coodinates'
               
            }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });

});

router.patch('/:coodinateId', (req, res, next) => {
    const id = req.params.coodinateId;
    console.log(req.body)
    Coodinate.update({ _id: id }, { $set: {coordinates: req.body } })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'coodinate updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/coodinates/' + id
            }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
})


module.exports = router;

