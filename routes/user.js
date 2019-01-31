const express = require("express")
const router = express.Router()
const User = require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

router.post('/register', (req, res, next) => {
    console.log(res.body);
    User.find({ email: req.body.email })
        .exec()
        .then(user => { 
            if(user.length >= 1){
                return res.status(409).json({
                    success: false,
                    message: 'Mail Exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err){
                        return res.status(500).json({
                            success: false,
                            error: err       
                        });
                    }else {
                        console.log('User Created');
                        console.log('Hashing Password : '+ hash)
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            firstName: req.body.firstname,
                            lastName: req.body.lastname,
                            role: req.body.role,
                            rowId: req.body.rowId
                        });
                        user
                            .save()
                            .then(result => {
                                console.log({ 
                                    Message1: ' User Signed up ',  
                                    E_mail: req.body.email,
                                    Hashed_password: hash,
                                    FirstName: req.body.firstname,
                                    LastName: req.body.lastname
                                });
                                res.status(201).json({
                                    user: user,
                                    success: true,
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err,
                                    success: false,
                                });
                            });
                    }
                });
            }
        })
});


router.post('/login', (req, res) =>{
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            User.findById(user[0]._id).then(abc =>{
                console.log(abc)
            }
                
            )
            console.log(user)
            res.json({
                message: user
            })
            if(user.length < 1){
                return res.status(401).json({
                    message: 'Authantication failed. E-mail not exist.'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (result){
                    token = jwt.sign({user: user[0]}, 'secretkey',(err, token) => {
                        if(err){
                            res.json({ error: err })
                        } else {
                            console.log('Token is:- '+token);
                            return res.status(200).json({
                                state: true,
                                JWT_Token: token
                            })
                        }
                        console.log('token genetas : '+ this.token);
                    });
                }
                else {
                    return res.status(401).json({
                        message: 'Authantication Failed. Password is incorrect.'
                    })
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


module.exports = router