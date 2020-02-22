const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('./user');

const sgMail = require('../sgmail');

var AWS = require('aws-sdk')
const fs = require('fs')



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

router.post('/test', (req, res) => {
    console.log(req);
    res.status(200).send({"msg":"working"})
});


router.get('/aws', (req, res) => {
    const BUCKET = 'jr-payment-screenshots'
    const REGION = 'eu-west-1'
    const ACCESS_KEY = 'AKIAVDUI74KBNQBGHX5B'
    const SECRET_KEY = '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'
    
    const localImage = 'jrnewlogo.jpeg'
    const imageRemoteName = `catImage_${new Date().getTime()}.png`
    
    AWS.config.update({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY,
      region: REGION
    })
    
    var s3 = new AWS.S3()
    
    s3.putObject({
      Bucket: BUCKET,
      Body: fs.readFileSync(localImage),
      Key: imageRemoteName
    })
      .promise()
      .then(response => {
        console.log(`done! - `, response)
        console.log(
          `The URL is ${s3.getSignedUrl('getObject', { Bucket: BUCKET, Key: imageRemoteName })}`
        )
      })
      .catch(err => {
        console.log('failed:', err)
      })
})




module.exports = router;
