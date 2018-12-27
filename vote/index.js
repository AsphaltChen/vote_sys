"use strict";
const Hapi = require("hapi");
const config = require("config");
const port = config.get("server.port");
const Inert = require("inert");
const Vision = require("vision");
const HapiSwagger = require("hapi-swagger");

(async () => {
  let server;
  const swaggerOptions = {
    info: {
      title: "vote_sys API",
      version: "0.0.1",
      description: "It is a description"
    },
    grouping: "tags",
    expanded: "none",
    cors: true,
    auth: false,
    jsonEditor: false,
    swaggerUI: true,
    documentationPage: true,
    lang: "zh-cn",
    tags: [
      {
        name: "api",
        description: "It is a description!"
      },
      {
        name: "voter",
        description: "It is a voter's api!"
      },
      {
        name: "admin",
        description: "It is a admin api!"
      }
    ]
  };

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
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions
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
