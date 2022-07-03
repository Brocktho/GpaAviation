export const loader = async () => {
  const BODY: BodyInit = JSON.stringify({
    message: "Hello World",
    thisIsStupid: true,
  });
  return new Response(BODY, {
    status: 200,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  });
};
