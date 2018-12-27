"use strict";
const jwkToPem = require("jwk-to-pem");
const jsonfile = require("jsonfile");
const jwt = require("jsonwebtoken");
const config = require("config");

async function getPrivateKey() {
  try {
    let jwks = await jsonfile.readFile("./config/jwks.json");
    // console.log(jwks);

    var jwk = jwks.keys[0];
    let pem = jwkToPem(jwk, { private: true });
    // console.log(pem);

    return pem;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getPublicKey() {
  try {
    let jwks = await jsonfile.readFile("./config/public.json");
    // console.log(jwks);

    var jwk = jwks.keys[0];
    let pem = jwkToPem(jwk, { private: false });
    // console.log(pem);

    return pem;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function sign(payload) {
  // let pem = await getPrivateKey();
  let pemLoc = config.get("jwt.private");
  let pem = require("fs")
    .readFileSync(pemLoc)
    .toString();

  console.log(pem);

  if (!pem) {
    return null;
  }
  let options = {
    algorithm: "RS256",
    expiresIn: "200 days",
    // audience: "test.k8s",
    issuer: "xsdm",
    jwtid: "xsdm123456",
    // subject: null,
    // noTimestamp: null,
    // header: null,
    // keyid: null,
    mutatePayload: false
  };
  let sign = jwt.sign(payload, pem, options);
  return sign;
}

async function verify(token) {
  let pem = await getPublicKey();
  if (!pem) {
    return null;
  }
  let options = {
    algorithm: "RS256"
    // audience: null,
    // issuer: null,
    // ignoreExpiration: null,
    // ignoreNotBefore: null,
    // subject: null,
    // clockTolerance: null,
    // maxAge: null,
    // clockTimestamp: "200 days",
  };
  let sign = jwt.verify(token, pem, options);
  return sign;
}

module.exports = {
  getPrivateKey,
  getPublicKey,
  sign,
  verify
};
