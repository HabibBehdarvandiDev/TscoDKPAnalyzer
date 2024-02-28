"use client";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavigationLinks from "./NavigationLinks";

const DashboardNavigationMenu = () => {
  const currentPath = usePathname();

  return (
    <nav className="flex flex-col space-y-3 my-8 flex-1">
      {NavigationLinks.map((link) => {
        // check the current path
        const isActive = currentPath === link.path;
        return (
          <div key={link.path}>
            <Link href={link.path}>
              <Flex
                className={`p-3 rounded-lg font-medium flex items-center ${
                  isActive
                    ? "text-lime-700 bg-lime-500 bg-opacity-20"
                    : "text-gray-400"
                }`}
                key={link.title}
              >
                {link.icon}
              </Flex>
            </Link>
          </div>
        );
      })}
    </nav>
  );
};

export default DashboardNavigationMenu;
