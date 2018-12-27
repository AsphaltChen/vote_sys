"use strict";
const Joi = require("joi");
const pino = require("pino")();
const { persis, cache } = require("../utils/axios");

module.exports = [
  {
    path: "/admin",
    method: "POST",
    options: {
      description: "管理员检验",
      tags: ["api", "admin"],
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
        let res = await cache.post("/admin", req);
        return res.data;
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
      tags: ["api", "admin"],
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
        let res = await cache.put("/admin", req);
        return res.data;
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
      tags: ["api", "admin"],
      validate: {}
    },
    handler: async function(request, h) {
      try {
        let res = await cache.get("/votes", {});
        return res.data;
      } catch (err) {
        pino.error(err);
        return { err: err.name };
      }
    }
  },
  {
    path: "/candidate",
    method: "POST",
    options: {
      description: "创建候选人",
      tags: ["api", "admin"],
      validate: {
        payload: {
          name: Joi.string().required(),
          gender: Joi.string().required(),
          resume: Joi.string().required(),
          avatar: Joi.string()
        }
      }
    },
    handler: async function(request, h) {
      const req = request.payload;
      try {
        let res = await cache.post("/candidate", { name: req.name });
        if (res.data.result && res.data.result === 0) {
          let result = await persis.post("/candidate", req);
          return result.data;
        } else {
          return { result: 1 };
        }
      } catch (err) {
        pino.error(err);
        return { err: err.name };
      }
    }
  }
];
