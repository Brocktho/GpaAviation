import { Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { find24HourWeather, GetAllWeatherData } from "~/models/weather.server";

import type { LoaderFunction } from "@remix-run/node";
import type {
  WeatherDatasWithWeathers,
  WeatherDatas,
} from "~/models/weather.server";

export type WeatherIndexData = {
  lastTwenty: WeatherDatasWithWeathers;
  allTime: WeatherDatas;
};

export const loader: LoaderFunction = async ({ request }) => {
  let today = new Date();
  let last24 = await find24HourWeather(today.getDate() - 1);
  let allTime = await GetAllWeatherData();
  return json({ lastTwenty: last24, allTime: allTime });
};

const WeatherIndex = () => {
  let Data = useLoaderData() as WeatherIndexData;
  return (
    <>
      {Data.lastTwenty.map((entry) => {
        return <div className="w-full bg-slate-700">{entry.weather.code}</div>;
      })}
    </>
  );
};

export default WeatherIndex;
