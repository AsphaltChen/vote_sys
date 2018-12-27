const Joi = require("joi");
const RedisUtil = require("../utils/redisUtil");
const pino = require("pino")();
const client = RedisUtil.getInstance().getClient();
module.exports = [
  {
    path: "/admin",
    method: "POST",
    options: {
      description: "管理员检验",
      validate: {
        payload: {
          username: Joi.string().required(),
          password: Joi.string().required()
        }
      }
    },
    handler: async function(request, h) {
      const req = request.payload;
      try {
        let pswd = await client.getAsync(req.username);
        if (pswd === req.password) return { result: 0 };
        else return { result: 1 };
      } catch (err) {
        pino.error(err);
        return { err: err.name };
      }
    }
  },
  {
    path: "/admin",
    method: "PUT",
    options: {
      description: "管理进度",
      validate: {
        payload: {
          state: Joi.boolean().required(),
          start: Joi.string(),
          end: Joi.string()
        }
      }
    },
    handler: async function(request, h) {
      const req = request.payload;
      try {
        let pros = [];
        if (req.start) {
          pros.push(client.hsetAsync("voting", "start", req.start));
        }
        if (req.end) {
          pros.push(client.hsetAsync("voting", "end", req.end));
        }
        pros.push(client.hsetAsync("voting", "state", req.state));
        await Promise.all(pros);
        return { result: 0 };
      } catch (err) {
        pino.error(err);
        return { err: err.name };
      }
    }
  },
  {
    path: "/candidate",
    method: "post",
    options: {
      description: "增加候选人",
      validate: {
        payload: {
          name: Joi.boolean().required()
        }
      }
    },
    handler: async function(request, h) {
      const req = request.payload;
      try {
        let score = await client.zscoreAsync("vote:now", req.name);
        if (score) {
          let res = await client.zaddAsync("vote:now", -1);
          return { result: res };
        } else {
          return { result: 1 };
        }
      } catch (err) {
        pino.error(err);
        return { err: err.name };
      }
    }
  },
  {
    path: "/votes",
    method: "GET",
    options: {
      description: "获取投票结果",
      validate: {}
    },
    handler: async function(request, h) {
      try {
        let res = await client.zscanAsync("vote:now", -1);
        return { result: res };
      } catch (err) {
        pino.error(err);
        return { err: err.name };
      }
    }
  }
];
