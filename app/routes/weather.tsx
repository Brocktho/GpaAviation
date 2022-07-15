import { Outlet } from "@remix-run/react";

export const Weather = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Weather;
