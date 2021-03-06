"use strict";
Object.defineProperty(exports,"__esModule",{value:true});
var jsonwebtoken_1 = require("jsonwebtoken");
function generateToken(payload, secret, expiresIn) {
  return new Promise((function(resolve, reject) {
    jsonwebtoken_1.sign(payload, secret,{ expiresIn: expiresIn }, function(err, token) { return err ? reject(err) : resolve(token); });
  }));
}
exports.generateToken = generateToken;
function verifyToken(token, secret) {
  return new Promise((function(resolve, reject) {
    jsonwebtoken_1.verify(token, secret, function(err, payload) { return err ? reject(err) : resolve(payload); });
  }));
}
exports.verifyToken = verifyToken;
var DefaultTokenService = (function() {
  function DefaultTokenService(){}
  DefaultTokenService.prototype.generateToken = function(payload, secret, expiresIn) {
    return generateToken(payload, secret, expiresIn);
  };
  DefaultTokenService.prototype.verifyToken = function(token, secret) {
    return verifyToken(token, secret).then(function(v) { return v; }).catch(function(err) {
      if (err instanceof jsonwebtoken_1.TokenExpiredError) {
        err['errorType'] = 'TokenExpired';
      }
      throw err;
    });
  };
  return DefaultTokenService;
}());
exports.DefaultTokenService = DefaultTokenService;
