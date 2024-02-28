import { FiBox } from "react-icons/fi";
import { RiHome6Line } from "react-icons/ri";

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
    path: "/dashboard",
    icon: <RiHome6Line className="w-7 h-7" />,
  },
  {
    title: "digikala",
    path: "/dashboard/digikala",
    icon: <FiBox className="w-7 h-7" />,
  },
];

export default NavigationLinks;
