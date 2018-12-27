"use strict";
const RedisConn = require("./redisConn");

class RedisUtil {
  constructor() {
    this.client = new RedisConn("cache").createClient();
  }

  static getInstance() {
    return this.instance || (this.instance = new RedisUtil());
  }

  getClient() {
    return this.client;
  }
}

module.exports = RedisUtil;
