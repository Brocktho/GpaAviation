import express from "express";
import { createServer } from "http";
import { createRequestHandler } from "@remix-run/express";
import { FetchWeatherData, FetchFromLive } from "./scheduling/scheduleWeather";
import cron from "node-cron";

const app = express();

const httpServer = createServer(app);

const checkCron = () => {
  console.log("Ran this cron");
};

if (process.env.NODE_ENV !== "production") {
  cron.schedule("*/5 * * * *", FetchFromLive);
  cron.schedule("47 * * * *", checkCron);
} else {
  cron.schedule("15 * * * *", FetchWeatherData);
}
// needs to handle all verbs (GET, POST, etc.)
app.all(
  "*",
  createRequestHandler({
    // `remix build` and `remix dev` output files to a build directory, you need
    // to pass that build to the request handler
    build: require("../build"),

    // return anything you want here to be available as `context` in your
    // loaders and actions. This is where you can bridge the gap between Remix
    // and your server
    getLoadContext(req, res) {
      return {};
    },
  })
);

const port = process.env.PORT || 3000;

// instead of running listen on the Express app, do it on the HTTP server
httpServer.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
