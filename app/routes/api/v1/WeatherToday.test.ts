import { loader } from "./WeatherToday";
import crypto from "crypto";
import invariant from "tiny-invariant";

test("Loader Returns 401 When Signature is incorrect", async () => {
  const InvalidSignature: RequestInit = {
    headers: { "X-Testing-Signature-256": "" },
    method: "POST",
    body: JSON.stringify({ test: "Value" }),
  };
  const MissingHeader: RequestInit = {
    method: "POST",
    body: JSON.stringify({ test: "Value" }),
  };

  const InvalidResponse = await loader({
    request: new Request(
      `https://localhost:3000/api/v1/WeatherToday`,
      InvalidSignature
    ),
    context: "",
    params: {},
  });
  const InvalidStatus = InvalidResponse.status;
  const InvalidData = await InvalidResponse.json();

  expect(InvalidStatus).toBe(401);
  expect(InvalidData.message).toBe("Signatures Don't match");

  const MissingResponse = await loader({
    request: new Request(
      "https://localhost:3000/api/v1/WeatherToday",
      MissingHeader
    ),
    context: "",
    params: {},
  });

  const MissingStatus = MissingResponse.status;
  const MissingData = await MissingResponse.json();

  expect(MissingStatus).toBe(401);
  expect(MissingData.message).toBe("Signatures Don't match");
});

test("Loader Returns 405 when using GET", async () => {
  invariant(process.env.VITE_TESTING_API_KEY, "Required Environment Variable");

  const Posting: RequestInit = {
    headers: {
      "X-Testing-Signature-256": `sha256=${crypto
        .createHmac("sha256", process.env.VITE_TESTING_API_KEY)
        .update(JSON.stringify({ test: "Value" }))
        .digest("hex")}`,
    },
    method: "GET",
  };

  let PostingResponse = await loader({
    request: new Request("https://localhost:3000/api/v1/WeatherToday", Posting),
    context: "",
    params: {},
  });

  const status = PostingResponse.status;
  const data = await PostingResponse.json();
  expect(data.message).toBe("Method Not Allowed");
  expect(status).toBe(405);
});

test("Loader Returns Weather Data", async () => {
  invariant(process.env.TESTING_API_KEY, "Required Environment Variable");
  const Valid: RequestInit = {
    headers: {
      "X-Testing-Signature-256": `sha256=${crypto
        .createHmac("sha256", process.env.TESTING_API_KEY)
        .update(JSON.stringify({ test: "Value" }))
        .digest("hex")}`,
    },
    method: "POST",
    body: JSON.stringify({ test: "Value" }),
  };
  let ValidResponse = await loader({
    request: new Request("https://localhost:3000/api/v1/WeatherToday", Valid),
    context: "",
    params: {},
  });

  let ValidStatus = ValidResponse.status;

  expect(ValidStatus).toBe(200);
});
