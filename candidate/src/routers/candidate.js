const Joi = require("joi");
const pino = require("pino")();

module.exports = [
  {
    path: "/candidate",
    method: "POST",
    options: {
      description: "创建候选人",
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
      const Candidate = request.getDb().getModel("Candidate");
      try {
        let candidate = await Candidate.create({
          name: req.mobile,
          gender: req.email,
          resume: req.username,
          avatar: req.nickname
        });
        return { result: 0, id: candidate.id };
      } catch (err) {
        pino.error(err);
        return { err: err.name };
      }
    }
  },
  {
    path: "/candidate",
    method: "DELETE",
    options: {
      description: "删除候选人",
      validate: {
        payload: {
          id: Joi.number()
            .integer()
            .required()
        }
      }
    },
    handler: async function(request, h) {
      const req = request.payload;
      const Candidate = request.getDb().getModel("Candidate");
      try {
        let candidate = await Candidate.destroy({
          where: {
            id: req.id
          }
        });
        return { result: candidate == 1 ? 0 : 1 };
      } catch (err) {
        pino.error(err);
        return { err: err.name };
      }
    }
  },
  {
    path: "/candidate",
    method: "PUT",
    options: {
      description: "修改候选人信息",
      validate: {
        payload: {
          id: Joi.number()
            .integer()
            .required(),
          name: Joi.string(),
          gender: Joi.string(),
          resume: Joi.string(),
          avatar: Joi.string()
        }
      }
    },
    handler: async function(request, h) {
      const req = request.payload;
      const Candidate = request.getDb().getModel("Candidate");
      try {
        let candidate = await Candidate.update(
          {
            name: req.mobile,
            gender: req.email,
            resume: req.username,
            avatar: req.nickname
          },
          {
            where: {
              id: req.id
            }
          }
        );
        return { result: candidate == 1 ? 0 : 1 };
      } catch (err) {
        pino.error(err);
        return { err: err.name };
      }
    }
  },
  {
    path: "/candidate",
    method: "GET",
    options: {
      description: "获取候选人信息",
      validate: {
        query: {
          id: Joi.number()
            .integer()
            .required()
        }
      }
    },
    handler: async function(request, h) {
      const req = request.query;
      const Candidate = request.getDb().getModel("Candidate");
      try {
        let candidate = await Candidate.findByPk({
          id: req.id
        });
        return candidate;
      } catch (err) {
        pino.error(err);
        return { err: err.name };
      }
    }
  },
  {
    path: "/candidates",
    method: "GET",
    options: {
      description: "获取候选人信息",
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
      const req = request.query;
      const Candidate = request.getDb().getModel("Candidate");
      try {
        let candidate;
        if (page !== -1) {
          candidate = await Candidate.findAndCountAll({
            limit: req.size,
            offset: req.size * (req.page - 1)
          });
        } else {
          candidate = await Candidate.findAll({});
        }
        return candidate;
      } catch (err) {
        pino.error(err);
        return { err: err.name };
      }
    }
  }
];
