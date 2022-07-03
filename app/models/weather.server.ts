import type { WeatherData, Weather, Prisma } from "@prisma/client";
import type { WeatherResponse, Structured } from "~/types";

import { prisma } from "~/db.server";

export type { WeatherData, Weather } from "@prisma/client";

let Query: Prisma.WeatherDataFindManyArgs;

let uniqueQuery: { where: Prisma.WeatherDataWhereUniqueInput };

export async function ByCity(city: string) {
  Query.where = {
    ...Query.where,
    city_name: {
      contains: city,
    },
  };
}

export async function ByDay(time: Date) {
  Query.where = {
    ...Query.where,
    createdAt: {
      gte: time,
      lte: time,
    },
  };
}

export async function ByHour(start: Date, end: Date) {
  Query.where = {
    ...Query.where,
    createdAt: {
      gte: start,
      lte: end,
    },
  };
}

export async function finishManyQuery() {
  const RESPONSE = prisma.weatherData.findMany(Query);
  Query = {};
  return RESPONSE;
}

export async function finishUniqueQuery() {
  const RESPONSE = prisma.weatherData.findUnique(uniqueQuery);
  Query = {};
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
