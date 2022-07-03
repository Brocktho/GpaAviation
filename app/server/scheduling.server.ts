import { createHourlyWeatherData } from "~/models/weather.server";

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
