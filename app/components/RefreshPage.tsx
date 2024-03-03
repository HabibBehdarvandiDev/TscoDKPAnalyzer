import { Button } from "@radix-ui/themes";
import { FaArrowRotateLeft } from "react-icons/fa6";

const RefreshPage = () => {
  const handleRefresh = () => {
    console.log("clicked");

    window.location.reload();
  };

  return (
    <Button onClick={handleRefresh} color="red" size={"3"} variant="solid">
      <FaArrowRotateLeft className="w-3 h-3" />
    </Button>
  );
};

export default RefreshPage;
