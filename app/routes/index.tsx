import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-700 sm:flex sm:items-center sm:justify-center"></main>
  );
}
