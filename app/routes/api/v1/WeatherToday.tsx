import { GetAllWeatherData } from "~/models/weather.server";
import { json } from "@remix-run/node";
import crypto from "crypto";
import invariant from "tiny-invariant";

import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ message: "Method Not Allowed" }, 405);
  }
  const requestSignature = request.headers.get("X-Testing-Signature-256");
  const Body = await request.json();
  let environString: string;
  if (
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "development"
  ) {
    invariant(process.env.TESTING_API_KEY, "TESTING_API_KEY is required");
    environString = process.env.TESTING_API_KEY;
  } else {
    invariant(
      process.env.VITE_TESTING_API_KEY,
      "VITE_TESTING_API_KEY is required"
    );
    environString = process.env.VITE_TESTING_API_KEY;
  }
  let signature = `sha256=${crypto
    .createHmac("sha256", environString)
    .update(JSON.stringify(Body))
    .digest("hex")}`;
  if (signature === requestSignature) {
    if (
      process.env.NODE_ENV === "production" ||
      process.env.NODE_ENV === "development"
    ) {
      let weatherData = await GetAllWeatherData();
      return json({ message: "Weather Data", data: weatherData }, 200);
    } else {
      return json({ message: "Weather Data" }, 200);
    }
  } else {
    return json({ message: "Signatures Don't match" }, 401);
  }
};
