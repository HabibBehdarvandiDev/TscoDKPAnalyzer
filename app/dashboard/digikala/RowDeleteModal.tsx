"use client";

import Callout from "@/app/components/Callout";
import { useUserContext } from "@/context/UserContext";
import {
  DialogRoot,
  DialogTrigger,
  Button,
  DialogContent,
  DialogTitle,
  DialogDescription,
  Flex,
  TextField,
  DialogClose,
  Text,
  Badge,
} from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";

import { FiTrash } from "react-icons/fi";

const RowDeleteModal = ({ item }: any) => {
  const { decodeAuthToken } = useUserContext();
  const [deleteMessage, setDeleteMessage] = useState<boolean>(false);

  const user = decodeAuthToken();

  const handleDelete = async () => {
    try {
      // Send delete request to delete the product with the given id
      const response = await axios
        .delete(`http://localhost:3000/api/product/${item.id}`)
        .then((response) => {
          if (response.status === 200) {
            setDeleteMessage(true);
          }
        });
    } catch (error) {
      console.error("Error deleting product:", error);
      // Handle error as needed
    }
  };

  return (
    <DialogRoot>
      <DialogTrigger>
        <Button variant="outline" color="red">
          <FiTrash className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent style={{ maxWidth: 450 }}>
        <DialogTitle className="uppercase">حذف کالا {item.title}</DialogTitle>
        <DialogDescription size="2" mb="4">
          <b>{user?.first_name}</b> عزیز، شما در حال حذف کالای{" "}
          <Badge variant="surface" size={"1"} color="red" className="uppercase">
            {item.title}
          </Badge>{" "}
          هستید. لطفا در نظر داشته باشید که فعالیت شما در پایگاه داده ذخیره می
          شود.
          <Badge color="yellow" variant="soft" size={"1"} my={"3"}>
            لطفا بعداز حذف کالا صفحه را دوباره بارگزاری کنید
          </Badge>
        </DialogDescription>

        <Flex gap="3" mt="4" justify="start">
          <DialogClose>
            <Button variant="soft" color="gray">
              لغو
            </Button>
          </DialogClose>
          <DialogClose>
            <Button onClick={() => handleDelete()}>حذف</Button>
          </DialogClose>
        </Flex>
        {deleteMessage && (
          <Flex my={"3"} justify={"center"}>
            <Callout
              text="کالای مورد نظر حذف شده لطفا صفحه را دوباره بارگزاری کنید."
              color="green"
              size="2"
              variant="surface"
            />
          </Flex>
        )}
      </DialogContent>
    </DialogRoot>
  );
};

export default RowDeleteModal;
