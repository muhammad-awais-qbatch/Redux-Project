import "./Navbar.css";
import "flowbite";
// import {} from 'rea'
import { NavLink, Outlet } from "react-router-dom";
import React from "react";

function Button(props) {
  return (
    <li>
      <NavLink
        to={props.link}
        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
      >
        {props.text}
      </NavLink>
    </li>
  );
}

export default function Navbar() {
  return (
    <>
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <Button text="Posts" link="/posts" />
              <Button text="Products" link="/products" />
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
