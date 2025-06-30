import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const [isOpen, setIsopen] = useState(false);
  const toggleMenu = () => {
    setIsopen(!isOpen);
  };
  return (
    <header className="bg-sky-300 p-4">
      <nav className="container mx-auto flex items-center justify-between">
        <Link className="font-bold md:text-3xl" to={"/"}>
          Fashion Shop
        </Link>
        {/** Desktop View UI */}
        <button onClick={toggleMenu} className="block text-2xl lg:hidden">
          &#8801;
        </button>
        <ul className="hidden gap-6 md:text-2xl lg:flex">
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "text-cyan-700" : "hover:text-amber-600"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/shop"}
              className={({ isActive }) =>
                isActive ? "text-cyan-700" : "hover:text-amber-600"
              }
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/cart"}
              className={({ isActive }) =>
                isActive ? "text-cyan-700" : "hover:text-amber-600"
              }
            >
              Cart
            </NavLink>
          </li>
        </ul>
        {/** Mobile View UI */}
        <div
          className={`fixed inset-0 z-50 transform bg-sky-300/80 ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out lg:hidden`}
        >
          <div className="flex h-full flex-col items-center justify-center gap-8">
            <Link
              onClick={toggleMenu}
              to="/"
              className="text-3xl hover:text-amber-600"
            >
              Home
            </Link>
            <Link
              onClick={toggleMenu}
              to="/shop"
              className="text-3xl hover:text-amber-600"
            >
              Shop
            </Link>
            <Link
              onClick={toggleMenu}
              to="/cart"
              className="text-3xl hover:text-amber-600"
            >
              Cart
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
