import { Flex, Heading } from "@radix-ui/themes";
import HeaderActions from "./HeaderActions";

const Header = () => {
  return (
    <header className="px-6 py-4 flex justify-between items-center border-b-red-500 border-opacity-45 border-b">
      <Heading as="h1" className="text-red-600">
        Tsco Game DKP Analyzer
      </Heading>
      <HeaderActions />
    </header>
  );
};

export default Header;
