const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('./user');

const sgMail = require('../sgmail');


router.use(bodyParser.json());

// create a user 

router.post("/create", (req, res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address,
        paymentTranxId: req.body.paymentTranxId,
        paymentScreenshot: req.body.paymentScreenshot
    }, (err, user) => {
        if (err) return res.status(401).send({ msg: err })
        else {
            const msg = {
                to: user.email,
                from: 'jrcontest@info.in',
                subject: 'Sending with Twilio SendGrid is Fun',
                text: 'and easy to do anywhere, even with Node.js',
                html: '<strong>and easy to do anywhere, even with Node.js</strong>',
              };
              sgMail.send(msg);
              res.status(200).send(user);
        }
    });
});


module.exports = router;
