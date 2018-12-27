const Joi = require("joi");
const RedisUtil = require("../utils/redisUtil");
const pino = require("pino")();
const client = RedisUtil.getInstance().getClient();

module.exports = [
  {
    path: "/vote",
    method: "POST",
    options: {
      description: "选民投票",
      validate: {
        payload: {
          mail: Joi.string().required(),
          name: Joi.string().required()
        }
      }
    },
    handler: async function(request, h) {
      const req = request.payload;
      try {
        let history = await client.hgetAsync("voter", req.mail);
        if (history) {
          return { result: 1 };
        } else {
          let result = await client.hsetAsync("voter", req.mail, req.name);
          if (result) {
            let res = await client.zincrbyAsync("vote:now", 1, req.name);

            if (res > 0) {
              return { result: 0 };
            } else {
              await client.hdelAsync("voter", req.mail, req.name);
              return { result: 1 };
            }
          }
        }
        return { result: 0, id: voter.id };
      } catch (err) {
        pino.error(err);
        return { result: 1 };
      }
    }
  }
];
