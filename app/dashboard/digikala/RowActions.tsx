import { Button, Flex } from "@radix-ui/themes";
import { FiInfo, FiTrash } from "react-icons/fi";

const RowActions = ({ item }: any) => {
  return (
    <>
      <Flex justify="center" align="center" style={{ height: "100%" }} className="space-x-3">
        <Button variant="outline" color="red">
          <FiTrash className="w-4 h-4" />
        </Button>
        <Button variant="solid" color="crimson">
          <FiInfo className="w-4 h-4" />
        </Button>
      </Flex>
    </>
  );
};

export default RowActions;
