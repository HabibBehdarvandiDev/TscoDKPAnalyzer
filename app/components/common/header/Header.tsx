import { Heading } from "@radix-ui/themes";
import HeaderActions from "./HeaderActions";

const Header = () => {
  return (
    <header className="px-6 py-4 shadow-primaryLight flex justify-between items-center">
      <Heading as="h1" className="text-zinc-300">
        <span className="text-lime-600">Z</span>igoorat Store
      </Heading>
      <HeaderActions />
    </header>
  );
};

export default Header;