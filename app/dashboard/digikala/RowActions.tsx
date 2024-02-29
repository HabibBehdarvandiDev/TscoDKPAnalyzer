import { Button, Flex } from "@radix-ui/themes";
import { FiInfo, FiTrash } from "react-icons/fi";
import RowDeleteModal from "./RowDeleteModal";
import RowInfoModal from "./RowInfoModal";

const RowActions = ({ item }: any) => {
  return (
    <>
      <Flex
        justify="center"
        align="center"
        style={{ height: "100%" }}
        className="space-x-3"
      >
        <RowDeleteModal item={item} />
        <RowInfoModal product={item} />
      </Flex>
    </>
  );
};

export default RowActions;
