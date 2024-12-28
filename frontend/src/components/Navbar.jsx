import React, { useState } from "react";
import { cartIcon, settingIcon, userIcon } from "../assets/icons";

// Navbar Component
// This component displays the navigation menu for the application.

const Navbar = () => {
  
  // Menus array holds the items displayed in the sidebar, each with a title and icon.
  const Menus = [
    { title: "Manage Products", src: cartIcon },
    { title: "Setting", src: settingIcon, gap: true },
    { title: "Profile", src: userIcon },
  ];

  return (
    <div
      className={` w-64 duration-300 h-screen bg-customPink p-4 fixed z-[30]`}
    >
      <div className="flex items-center justify-between">
        <h1 className={`text-white text-[20px] font-bold mb-2`}>MyShop</h1>
      </div>

      <div className="bg-white h-0.5 w-full border-0"></div>

      <ul className="pt-6">
        {Menus.map((item, index) => (
          <li
            key={index}
            className={` text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-lightWhite rounded-md ${
              item.gap ? "mt-9" : ""
            }`}
          >
            <img src={item.src} width={25} />
            <span className={`origin-left duration-300`}>{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
