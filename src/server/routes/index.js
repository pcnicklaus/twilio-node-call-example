var express = require('express');
var router = express.Router();
var twilio = require('twilio');
var js2xml = require('js2xmlparser');

var config = require('../../_config.js');


router.get('/', function(req, res, next) {

  var capability = new twilio.Capability(
    config.accountSid,
    config.authToken
  );

  capability.allowClientOutgoing(config.appToken);

  res.render('index', {
      token: capability.generate(),
      numberToCall: "+12243884883"
  });

});


router.get('/data', function(req, res, next){

    var phoneNumber = '12243884883';

    var callData = {
      'Dial': {
        '@': {
          'action' : '/forward?Dial=true',
          'callerId': '2243884883'
        },
        'Number': {
          '#' : phoneNumber
        }
      }
    };

    res.header('Content-Type','text/xml').send(js2xml('Response', callData));
});


module.exports = router;
