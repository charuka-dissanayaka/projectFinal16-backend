const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Alert = require('../models/alert');

router.post('/', (req, res, next) => {
    const alert = new Alert({
        _id: new mongoose.Types.ObjectId(),
        qualityCheckerID: req.body.qualityCheckerID,
        errorCount: req.body.errorCount,
        createdDate: req.body.createsDate,
        status: req.body.status,
        reason: req.body.reason,
    });

    alert.save().then(result => {
        console.log(result);
        res.status(201).json({
            data: result,
            message:'Created'
        })
    })
})

router.get('/', (req, res, next) => {
    Alert.find()
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
    Alert.find({$and: [{qualityCheckerID:id}, {status: 'proccessing'}]})
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

router.patch('/:alertId', (req, res, next) => {
    const id = req.params.alertId;
    Alert.update({_id: id}, {$set: {status: 'completed'}}).exec().then(ree => {
        res.status(201).json({
            message: 'Updated',
            data: ree
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    })

})


module.exports = router;