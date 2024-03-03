import Logo from "@/public/logo/logo_dark.png";
import { Avatar, Flex, Separator, Tooltip } from "@radix-ui/themes";
import Link from "next/link";
import DashboardNavigationMenu from "./DashboardNavigationMenu";
import Profile from "./Profile";
import Image from "next/image";

const Sidebar = () => {
  return (
    <Flex className="py-8 px-4 shadow-primaryLight flex flex-col items-center justify-between border-l-red-500 border-opacity-45 border-l">
      <Link href={"/admin/dashboard"}>
        <Flex className="p-1 rounded-lg border border-red-500 border-opacity-45">
        <Flex className="p-1 w-16">
          <Image src={Logo} alt="Logo" />
        </Flex>

        </Flex>
      </Link>

      <DashboardNavigationMenu />

      <div className="flex flex-col space-y-2 ">
        <Separator size={"4"} my={"3"} />

        <Profile />
      </div>
    </Flex>
  );
};

export default Sidebar;
