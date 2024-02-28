import Logo from "@/public/logo/logo.png";
import { Avatar, Flex, Separator, Tooltip } from "@radix-ui/themes";
import Link from "next/link";
import DashboardNavigationMenu from "./DashboardNavigationMenu";
import Profile from "./Profile";

const Sidebar = () => {
  return (
    <aside className="py-8 px-4 shadow-primaryLight flex flex-col items-center justify-between">
      <Link href={"/admin/dashboard"}>
        <Flex className="p-1 rounded-lg border border-primary border-opacity-25">
          <Avatar
            fallback={"Logo"}
            src={Logo.src}
            className=" p-2 fill-white"
            size={"4"}
          />
        </Flex>
      </Link>

      <DashboardNavigationMenu />

      <div className="flex flex-col space-y-2 ">
        <Separator size={"4"} my={"3"} />

        <Profile />
      </div>
    </aside>
  );
};

export default Sidebar;
