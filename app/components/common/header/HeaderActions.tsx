"use client";
import {
  Button,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiUser } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { PiGear } from "react-icons/pi";

const HeaderActions = () => {
  const router = useRouter();

  const handleLogout = () => {
    // remove token from session storage
    sessionStorage.removeItem("authToken");

    // push the user to the login page
    router.push("/auth/login");
  };

  return (
    <Button variant="solid" size={"2"} color="red" onClick={handleLogout}>
      Log Out <MdLogout className="ml-1 w-4 h-4" />
    </Button>
  );
};

export default HeaderActions;
