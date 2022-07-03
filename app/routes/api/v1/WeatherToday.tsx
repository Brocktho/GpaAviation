import { GetAllWeatherData } from "~/models/weather.server";
import { json } from "@remix-run/node";
import crypto from "crypto";
import invariant from "tiny-invariant";

import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ message: "Method Not Allowed" }, 405);
  }
  const requestSignature = request.headers.get("X-Testing-Signature-256");
  const Body = await request.json();
  invariant(process.env.TESTING_API_KEY, "TESTING_API_KEY is required");
  let signature = `sha256=${crypto
    .createHmac("sha256", process.env.TESTING_API_KEY)
    .update(JSON.stringify(Body))
    .digest("hex")}`;
  if (signature === requestSignature) {
    let weatherData = await GetAllWeatherData();
    return json({ message: "Weather Data", data: weatherData }, 200);
  } else {
    return json({ message: "Signatures Don't match" }, 401);
  }
};
