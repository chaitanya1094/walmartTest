const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const nocache = require('nocache')

const router=require('./router')

const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));






//// logging middlewere
let logger = (req, res, next) => {
  const { httpVersion, method,  url } = req;

  console.log(
     {
        timestamp: new Date(),
        httpVersion: httpVersion,
        ReqMethod:method,
        url:url
      }
    );
  next();
};

app.use(logger);



/// Scret key
const secret = 'my-secret';

///API to generate Autherization barier

app.get('/get-token', function(req, res) {
  var token = jwt.sign({userName: 'user'}, secret);
  res.send({token: token});
});

//// method to validate token

const verifyJWTToken = (token,secret, done) => {
  jwt.verify(token, secret, done);
}

const isAuthenticatedUser = (req, res, next) => {
  const authorizationHeader = req.get('Authorization');
  if(!authorizationHeader) {
    return res.status(401).json({"message":"Please provide token"});
  }
  const token = authorizationHeader.replace('Bearer ', '');
  verifyJWTToken(token,secret, (err, decoded) => {
    if(err) {
     return res.status(401).json({"message":"Not authenticated"});
    } else {
      next();
   }
 })
}


//// Autherization middlewere
app.use(isAuthenticatedUser);

app.set('etag', false)

app.use(nocache())

/// Router 
app.use('/product',router)

/// Error handling

app.use(function(err, req, res, next) {
  console.log(err)
  res.status(err.status || 500).send({error: err.message});
});


module.exports = app;