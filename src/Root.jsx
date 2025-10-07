import { NavLink, Outlet } from "react-router-dom";

const Root = () => {
  return (
    <main className="m-5">
      <nav className="flex gap-2 items-center  mb-5 border-b border-gray-500">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `${
              isActive ? "font-bold text-green-600" : ""
            } text-lg font-semibold`
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/login"}
          className={({ isActive }) =>
            `${
              isActive ? "font-bold text-green-600" : ""
            } text-lg font-semibold`
          }
        >
          Login
        </NavLink>
        <NavLink
          to={"/register"}
          className={({ isActive }) =>
            `${
              isActive ? "font-bold text-green-600" : ""
            } text-lg font-semibold`
          }
        >
          Register
        </NavLink>
      </nav>

      <Outlet />
    </main>
  );
};
export default Root;
