import { NavLink } from "@remix-run/react";

const MyNavLink = ({
  to,
  children,
}: {
  to: string;
  children?: React.ReactChild;
}) => {
  return (
    <NavLink
      className="h-8 transform text-slate-800 duration-150 hover:scale-125 dark:text-slate-50"
      to={to}
    >
      {children}
    </NavLink>
  );
};

export default MyNavLink;
