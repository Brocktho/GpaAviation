import { Link } from "@remix-run/react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-10 flex h-32 w-full flex-row justify-around border-b-2 border-slate-100 bg-slate-50 shadow-xl dark:bg-slate-700">
      <div className="w-1/5 bg-slate-400"></div>
      <div className="w-2/5 bg-red-400"></div>
      <div className="w-3/5 bg-green-400 md:w-1/5"></div>
    </nav>
  );
};

export default Navbar;
