"use strict";
var redis = require("redis");
var config = require("config");
const logger = require("pino")();
const bluebird = require("bluebird");
bluebird.promisifyAll(redis.RedisClient.prototype);

const RedisConn = function(connName) {
  let option = {};
  // let total_retry_time_in_second, connect_timeout_in_second;
  try {
    option = config.get("redis");
  } catch (err) {
    logger.error(err);
  }
  // try {
  //   total_retry_time_in_second = config.get("retry.total_retry_time_in_second");
  //   connect_timeout_in_second = config.get("retry.connect_timeout_in_second");
  // } catch (err) {}

  // total_retry_time_in_second = total_retry_time_in_second || 60;
  // connect_timeout_in_second = connect_timeout_in_second || 5;

  // option.retry_strategy = function(options) {
  //   if (options.total_retry_time > 1000 * total_retry_time_in_second) {
  //     return new Error("Retry time exhausted");
  //   }

  //   return Math.min(options.attempt * 100, 1000 * connect_timeout_in_second);
  // };

  const client = redis.createClient(option);
  client.connName = connName;

  client.on("reconnecting", function(reconnOpt) {
    logger.error("连接redis重连中!", client.connName, reconnOpt);
  });

  client.on("error", function(err) {
    logger.error("连接redis异常!", client.connName, err);
  });

  client.on("end", function() {
    logger.warn(client.connName, "连接redis连接结束!");
  });

  client.on("ready", function() {
    logger.info(client.connName, "连接redis建立成功!");
  });

  this.createClient = function() {
    return client;
  };
};
module.exports = exports = RedisConn;
