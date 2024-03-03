"use client";
import { Button, Flex, IconButton } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMoonSharp, IoSunnySharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

const HeaderActions = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const router = useRouter();

  const handleLogout = () => {
    // remove token from session storage
    sessionStorage.removeItem("authToken");

    // push the user to the login page
    router.push("/auth/login");
  };

  useEffect(() => {
    document.body.classList.remove(theme === "light" ? "dark" : "light");
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <Flex className="flex gap-3">
      <IconButton variant="surface">
        {theme === "light" ? (
          <IoMoonSharp onClick={() => setTheme("dark")} />
        ) : (
          <IoSunnySharp onClick={() => setTheme("light")} />
        )}
      </IconButton>
      <Button variant="solid" size={"2"} color="red" onClick={handleLogout}>
        Log Out <MdLogout className="ml-1 w-4 h-4" />
      </Button>
    </Flex>
  );
};

export default HeaderActions;
