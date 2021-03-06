import { env } from "process";
import { useRef } from "react";

import Button from "~/components/Buttons/Main";

export async function loader() {
  return env.WEATHER_KEY;
}

const Scheduling = () => {
  const FULL_NAME = useRef<HTMLInputElement>(null);

  return (
    <div className="flex min-h-screen w-screen flex-row items-center gap-4 bg-slate-50 px-8 dark:bg-slate-700">
      <form className="flex min-w-[16rem] max-w-[48%] flex-grow flex-col items-center rounded-xl  px-4 py-2">
        <ul className="flex flex-col items-center gap-6">
          <li className="group flex flex-col items-center gap-2">
            <label
              className="block w-32 translate-y-full cursor-pointer bg-slate-50 px-2 transition duration-200 group-hover:w-32 group-hover:translate-y-0 group-hover:text-xs"
              htmlFor="Name"
            >
              Full Name:
            </label>
            <input
              ref={FULL_NAME}
              className="rounded-full px-[0.314159rem]"
              id="Name"
              name="Name"
              type="text"
              placeholder="Full Name"
            />
          </li>
        </ul>
      </form>
      <div className="min-w-[16rem] max-w-[48%] flex-grow bg-slate-500">
        <Button color="green-500" text="Search" func={() => {}} />
      </div>
    </div>
  );
};
export default Scheduling;
