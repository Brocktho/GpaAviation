import { Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

const Navbar = () => {
  const user = useOptionalUser();
  return (
    <nav className="fixed top-0 left-0 z-10 flex h-32 w-full flex-row justify-around border-b-2 border-slate-100 bg-slate-50 shadow-xl dark:bg-slate-700">
      <div className="w-1/5 bg-slate-400"></div>
      <div className="hidden flex-row bg-red-400 md:flex md:w-2/5 "></div>
      <div className="w-3/5 bg-green-400 md:w-1/5">
        {user ? (
          <Link
            to="/notes"
            className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
          >
            View Notes for {user.email}
          </Link>
        ) : (
          <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
            <Link
              to="/join"
              className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
            >
              Sign up
            </Link>
            <Link
              to="/login"
              className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600  "
            >
              Log In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
