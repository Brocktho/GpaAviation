import { prisma } from "~/db.server";
import { Prisma } from "@prisma/client";

import type { WeatherData, Weather } from "@prisma/client";
import type { WeatherResponse, Structured } from "~/types";

export type { WeatherData, Weather } from "@prisma/client";
export type WeatherDatas = Array<WeatherData>;
export type WeatherDataWithWeather = Prisma.WeatherDataGetPayload<
  typeof weatherDataWithWeather
>;
export type WeatherDatasWithWeathers = Array<WeatherDataWithWeather>;

let Query: Prisma.WeatherDataFindManyArgs = {};

let uniqueQuery: { where: Prisma.WeatherDataWhereUniqueInput };

const weatherDataWithWeather = Prisma.validator<Prisma.WeatherDataArgs>()({
  include: { weather: true },
});

export async function ByCity(city: string) {
  Query["where"] = {
    ...Query?.where,
    city_name: {
      contains: city,
    },
  };
}

export async function ByDay(start: Date) {
  console.log(start);
  let end = new Date();
  end.setDate(start.getDate() + 1);
  console.log(end);
  Query.where = {
    ...Query.where,
    createdAt: {
      gte: start,
      lt: end,
    },
  };
}

export async function ByHour(start: Date, end: Date) {
  Query["where"] = {
    ...Query?.where,
    createdAt: {
      gte: start,
      lte: end,
    },
  };
}

export async function IncludeWeather() {
  Query.include = {
    ...Query.include,
    weather: true,
  };
}

export const finishManyQuery = async () => {
  console.log(Query);
  const RESPONSE = prisma.weatherData.findMany(Query);
  Query = {};
  return RESPONSE;
};

export const finishUniqueQuery = async () => {
  const RESPONSE = prisma.weatherData.findUnique(uniqueQuery);
  uniqueQuery = { where: {} };
};

export const GetAllWeatherData = async () => {
  return prisma.weatherData.findMany({
    include: { weather: true },
  });
};

export const GetTodaysWeatherData = async () => {
  let today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDay() + 1);
  return prisma.weatherData.findMany({
    where: { createdAt: { gte: today, lt: tomorrow } },
  });
};

export async function find24HourWeather(dayNumber: number) {
  let today = new Date();
  today.setDate(dayNumber);
  await ByDay(today);
  await IncludeWeather();
  return finishManyQuery();
}

export async function createHourlyWeatherData(weatherData: WeatherResponse) {
  console.log("creating new entry");
  let Weather = await prisma.weather.upsert({
    where: { code: weatherData.weather.code },
    update: {},
    create: weatherData.weather,
  });
  let structured = { ...weatherData, weatherCode: weatherData.weather.code };
  let { weather, ...desired } = structured;
  return prisma.weatherData.create({
    data: desired,
  });
}
