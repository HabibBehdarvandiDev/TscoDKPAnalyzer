import { Heading } from "@radix-ui/themes";
import HeaderActions from "./HeaderActions";

const Header = () => {
  return (
    <header className="px-6 py-4 shadow-primaryLight flex justify-between items-center border-b">
      <Heading as="h1" className="text-pink-600">
        تسکو آنالیزور
      </Heading>
      <HeaderActions />
    </header>
  );
};

export default Header;