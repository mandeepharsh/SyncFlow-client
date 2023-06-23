
import "./Sidebar.scss"


import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { GrMapLocation } from "react-icons/gr";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const menus = [
    { name: "dashboard", link: "/", icon: MdOutlineDashboard },
    { name: "Manage Yard", link: "/locations", icon: GrMapLocation },
    { name: "Issuance Log", link: "/", icon: TbReportAnalytics, margin: true },
    { name: "Employees", link: "/", icon: AiOutlineUser },
    { name: "", link: "/", icon: FiFolder },
    { name: "Setting", link: "/", icon: RiSettings4Line },
  ];
  const [open, setOpen] = useState(true);
  return (
    <section className="sidebar">
    <div className={`sidebar__main ${open ? "sidebar__main--open" : "sidebar__main--closed"}`}>
      <div className="sidebar__menu-toggle">
        <HiMenuAlt3
          size={26}
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="sidebar__menu">
        {menus?.map((menu, i) => (
          <Link
            to={menu?.link}
            key={i}
            className={`sidebar__link ${menu?.margin && "sidebar__link--with-margin"} `}
          >
            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
            <h2
              style={{transitionDelay: `${i + 3}00ms`}}
              className={`sidebar__link__name ${!open && "sidebar__link__name--hidden"}`}
            >
              {menu?.name}
            </h2>
            <h2
              className={`sidebar__link__tooltip ${open && "sidebar__link__tooltip--hidden"}`}
            >
              {menu?.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  </section>
  );
};

export default Sidebar;