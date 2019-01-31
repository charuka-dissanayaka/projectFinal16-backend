const express = require("express");
const router = express.Router();
const db ="mongodb://localhost:27017/homedb"
const mongoose = require("mongoose");
const Intimate = require('../models/intimate');

router.post('/saveMatrix', (req, res, next) => {
    console.log(req.body[0]);
    
    const intimate = new Intimate
    for(var i=0; i<10; i++){
        intimate.matrix.push(req.body[i]);
        intimate.markModified('matrix');
    }

    intimate
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                state: true,
                Message: "Datbase Updated"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                state: false
            })
        })
})

module.exports = router