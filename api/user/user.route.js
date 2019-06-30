const userService = require('../../services/user.service')
const express = require('express')
const router = express.Router()
module.exports = router

router.post('/login', (req, res)=>{
    const credentials = req.body;
    userService.login(credentials)
        .then(user => {
            req.session.user = user;
            res.json(user)
        })
        .catch(err => {
            console.log(err);
            res.status(401).send('Unauthorized')
        })
})

router.post('/logout', (req, res)=>{
    req.session.destroy();
    res.end()
});

router.post('/signup', (req, res)=>{
    const userData = req.body;
    userService.signup(userData)
        .then(user => {
            req.session.user = user;
            res.json(user)
        })
        .catch(err => {
            console.log(err);
            res.end(err);
        })
})
