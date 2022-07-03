import { Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { find24HourWeather, GetAllWeatherData } from "~/models/weather.server";

import type { LoaderFunction } from "@remix-run/node";
import type {
  WeatherDatasWithWeathers,
  WeatherDatas,
} from "~/models/weather.server";

export type WeatherIndex = {
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
  let Data = useLoaderData() as WeatherIndex;
  return (
    <div className="flex min-h-screen flex-col items-center gap-4 bg-slate-50 text-slate-700 dark:bg-slate-700 dark:text-slate-50">
      {Data.lastTwenty.map((entry) => {
        return <div className="w-full">{entry.weather.code}</div>;
      })}
    </div>
  );
};

export default WeatherIndex;
