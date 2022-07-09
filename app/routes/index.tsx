import { Link, Outlet } from "@remix-run/react";
import Navbar from "~/components/Navigation/Navbar";

export default function Index() {
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <Outlet />
    </main>
  );
}
