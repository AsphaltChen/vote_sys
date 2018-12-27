"use strict";

const axios = require("axios");
const config = require("config");
const axiosConfig1 = config.get("axios.per");
var persistent = axios.create(axiosConfig1);
const axiosConfig2 = config.get("axios.cache");
var cache = axios.create(axiosConfig2);

module.exports = {
  persistent,
  cache
};
