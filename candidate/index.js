"use strict";
const Hapi = require("hapi");
const Sequelize = require("sequelize");
const config = require("config");
const dbUri = config.get("db.uri");
const port = config.get("server.port");

(async () => {
  let server;
  try {
    server = await Hapi.server({
      port: port,
      routes: {
        cors: true
      }
    });
  } catch (error) {
    console.log("Get hapi server failed!", error);
  }
  try {
    await server.register([
      {
        plugin: require("hapi-sequelizejs"),
        options: [
          {
            name: "asphalt",
            models: ["./src/models/**/*.model.js"],
            sequelize: new Sequelize(dbUri, {
              operatorsAliases: Sequelize.Op,
              logging: false
            }),
            sync: true,
            forceSync: false
          }
        ]
      }
    ]);

    await server.register({
      plugin: require("hapi-router"),
      options: {
        routes: "src/routers/*.js"
      }
    });
  } catch (error) {
    console.log("Init configuration failed!", error);
  }

  try {
    await server.start();
    console.log("The server run at ", server.info.uri);
    // logger.info("The server run at ", server.info.uri);
  } catch (err) {
    // logger.error("Start the server error!", err);
    console.log(err);
  }
})();
