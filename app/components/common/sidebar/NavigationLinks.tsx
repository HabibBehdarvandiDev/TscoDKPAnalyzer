import { FaPeopleCarry } from "react-icons/fa";
import { GrAppleAppStore } from "react-icons/gr";
import { PiUsersThreeBold } from "react-icons/pi";
import { RiHome6Line } from "react-icons/ri";
import { TbListDetails, TbDiscount2 } from "react-icons/tb";
import { TfiApple } from "react-icons/tfi";

interface navigationSubMenu {
  title: string;
  path: string;
  icon: JSX.Element;
}

interface NavigationLinks {
  title: string;
  path: string;
  icon: JSX.Element;
  subMenu?: navigationSubMenu[];
}

const NavigationLinks: NavigationLinks[] = [
  {
    title: "Home",
    path: "/admin/dashboard",
    icon: <RiHome6Line className="w-7 h-7" />,
  },
  {
    title: "Apple",
    path: "/admin/dashboard/accounts",
    icon: <GrAppleAppStore className="w-7 h-7" />,
  },
  {
    title: "Customers",
    path: "/admin/dashboard/customers",
    icon: <PiUsersThreeBold className="w-7 h-7" />,
  },
  {
    title: "Discount",
    path: "/admin/dashboard/discount",
    icon: <TbDiscount2 className="w-7 h-7" />,
  },
  {
    title: "Colleagues",
    path: "/admin/dashboard/colleagues",
    icon: <FaPeopleCarry className="w-7 h-7" />,
  },
];

export default NavigationLinks;