import {
  DialogRoot,
  DialogTrigger,
  Button,
  DialogContent,
  DialogTitle,
  DialogDescription,
  Flex,
  DialogClose,
} from "@radix-ui/themes";
import React from "react";
import { FiInfo, FiTrash } from "react-icons/fi";

const RowInfoModal = ({ product }: any) => {
  return (
    <DialogRoot>
      <DialogTrigger>
        <Button variant="solid" color="crimson">
          <FiInfo className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent style={{ maxWidth: 650 }}>
        <DialogTitle className="uppercase">{product.title}</DialogTitle>
        <DialogDescription size="2" mb="4"></DialogDescription>

        <Flex gap="3" mt="4" justify="end">
          <DialogClose>
            <Button variant="soft" color="gray">
              لغو
            </Button>
          </DialogClose>
          <DialogClose>
            <Button>حذف</Button>
          </DialogClose>
        </Flex>
      </DialogContent>
    </DialogRoot>
  );
};

export default RowInfoModal;
