const Joi = require("joi");
const randomize = require("randomatic");
const passwordUtils = require("../utils/passwordUtils");

module.exports = [
  {
    path: "/voter",
    method: "POST",
    options: {
      description: "选民注册",
      validate: {
        payload: {
          mail: Joi.string()
            .regex(
              /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
            )
            .required(),
          password: Joi.string().required()
        }
      }
    },
    handler: async function(request, h) {
      const req = request.payload;
      const Voter = request.getDb().getModel("Voter");
      try {
        let salt = randomize("Aa0", 8);
        let voter = await Voter.create({
          mail: req.email,
          password: passwordUtils.hash(req.password, salt),
          salt: salt
        });
        return { result: 0, id: voter.id };
      } catch (err) {
        pino.error(err);
        return Result.err(err.name);
      }
    }
  },
  {
    path: "/voter/pswd",
    method: "PUT",
    options: {
      description: "选民修改密码",
      validate: {
        payload: {
          id: Joi.number()
            .integer()
            .required(),
          password: Joi.string().required()
        }
      }
    },
    handler: async function(request, h) {
      const req = request.payload;
      const Voter = request.getDb().getModel("Voter");
      try {
        let salt = randomize("Aa0", 8);
        let voter = await Voter.update(
          {
            password: passwordUtils.hash(req.password, salt),
            salt: salt
          },
          { where: { id: req.id } }
        );
        return { result: voter > 0 ? 0 : 1 };
      } catch (err) {
        pino.error(err);
        return Result.err(err.name);
      }
    }
  },
  {
    path: "/voter/pswd",
    method: "POST",
    options: {
      description: "选民密码校验",
      validate: {
        payload: {
          mail: Joi.string()
            .regex(
              /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
            )
            .required(),
          password: Joi.string().required()
        }
      }
    },
    handler: async function(request, h) {
      const req = request.payload;
      const Voter = request.getDb().getModel("Voter");
      try {
        let saltInfo = Voter.findOne({
          where: {
            mail: req.mail
          }
        });
        if (!saltInfo) {
          return { result: 1 };
        }
        let salt = saltInfo.salt;
        let voter = await Voter.findOne({
          where: {
            mail: req.email,
            password: passwordUtils.hash(req.password, salt)
          }
        });
        return { result: voter.id ? 0 : 1 };
      } catch (err) {
        pino.error(err);
        return Result.err(err.name);
      }
    }
  },
  {
    path: "/voter/state",
    method: "PUT",
    options: {
      description: "选民状态修改",
      validate: {
        payload: {
          id: Joi.number()
            .integer()
            .required(),
          state: Joi.number()
            .integer()
            .required()
        }
      }
    },
    handler: async function(request, h) {
      const req = request.payload;
      const Voter = request.getDb().getModel("Voter");
      try {
        let voter = await Voter.update(
          {
            state: req.state
          },
          { where: { id: req.id } }
        );
        return { result: voter > 0 ? 0 : 1 };
      } catch (err) {
        pino.error(err);
        return Result.err(err.name);
      }
    }
  },
  {
    path: "/voter",
    method: "GET",
    options: {
      description: "获取全部选民",
      validate: {
        query: {
          size: Joi.number()
            .integer()
            .required(),
          page: Joi.number()
            .integer()
            .required()
        }
      }
    },
    handler: async function(request, h) {
      const req = request.payload;
      const Voter = request.getDb().getModel("Voter");
      try {
        let voter;
        if (page !== -1) {
          voter = await Voter.findAndCountAll({
            limit: req.size,
            offset: req.size * (req.page - 1)
          });
        } else {
          voter = await Voter.findAll({});
        }
        return voter;
      } catch (err) {
        pino.error(err);
        return Result.err(err.name);
      }
    }
  }
];
