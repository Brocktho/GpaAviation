import {
  createHourlyWeatherData,
  IngestLiveData,
} from "~/models/weather.server";
import crypto from "crypto";
import invariant from "tiny-invariant";

import type { WeatherDatasWithWeathers } from "~/models/weather.server";

let existingCron = false;

export const CreateWeatherCron = async () => {
  if (process.env.NODE_ENV === "production") {
    if (existingCron) {
      return "Cron already Exists";
    } else {
      setInterval(() => {
        console.log("Starting Weather Job");
        FetchWeatherData();
      }, 1000 * 60 * 60);
      existingCron = true;
      return "Cron Scheduled";
    }
  } else if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    console.log("In Development");
    if (existingCron) {
      return "Already Fetched Data";
    } else {
      console.log("Haven't fetched");
      invariant(process.env.TESTING_API_KEY, "TESTING_API_KEY is required");
      const LIVE_DATA = await fetch(
        "https://joe-flys.fly.dev/api/v1/WeatherToday",
        {
          headers: {
            "X-Testing-Signature-256": `sha256=${crypto
              .createHmac("sha256", process.env.TESTING_API_KEY)
              .update(JSON.stringify({ test: "Value" }))
              .digest("hex")}`,
          },
          method: "POST",
          body: JSON.stringify({ test: "Value" }),
        }
      );
      console.log(LIVE_DATA.status);
      if (LIVE_DATA.status === 200) {
        const DATA = (await LIVE_DATA.json()) as {
          message: string;
          data: WeatherDatasWithWeathers;
        };
        console.log(DATA);
        IngestLiveData(DATA.data);
      }
      existingCron = true;
    }
  } else {
    // do something later;
    return "Not in production, no cron";
  }
};

export const FetchWeatherData = async () => {
  const URL = `https://api.weatherbit.io/v2.0/current?postal_code=21740&key=${process.env.WEATHER_KEY}`;
  //const URL = "http://localhost:3000/api/v1/HelloWorld";
  const RESPONSE = await fetch(URL, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (RESPONSE.ok) {
    if (RESPONSE.status === 200) {
      const DATA = await RESPONSE.json();
      createHourlyWeatherData(DATA.data[0]);
    }
  }
};
