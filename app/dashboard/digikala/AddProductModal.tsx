"use client";

import {
  DialogRoot,
  DialogTrigger,
  Button,
  DialogContent,
  DialogTitle,
  DialogDescription,
  Badge,
  Flex,
  DialogClose,
  IconButton,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from "@radix-ui/themes";
import { IoAddOutline } from "react-icons/io5";
import { TbCurrencyIranianRial } from "react-icons/tb";
import { ProductCategory } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

const AddProductModal = () => {
  const [selectValue, setSelectValue] = useState<string>("");

  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    const payload = {
      product_name: data.productName,
      dkp: parseInt(data.dkp),
      price: data.price,
      product_category: selectValue,
    };
    console.log(payload);

    const response = axios.post("/api/product", payload).then((res) => {
      console.log(res.data);
    });
  };

  const categories = Object.keys(ProductCategory);

  return (
    <DialogRoot>
      <DialogTrigger>
        <IconButton size={"3"} variant="solid" radius="medium" color="blue">
          <IoAddOutline className="w-5 h-5" />
        </IconButton>
      </DialogTrigger>

      <DialogContent style={{ maxWidth: 450 }}>
        <DialogTitle className="uppercase">ایجاد کالای جدید</DialogTitle>
        <DialogDescription size="2" mb="4">
          <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col space-y-3">
            <Flex className="flex flex-col space-y-3">
              <label htmlFor="Product Name" className="font-medium">
                نام کالا :{" "}
              </label>
              <TextFieldInput
                size={"3"}
                variant="surface"
                color="crimson"
                id="Product Name"
                {...register("productName")}
              />
            </Flex>
            <Flex className="flex flex-col space-y-3">
              <label htmlFor="dkp" className="font-medium">
                آیدی دیجیکالا(DKP):{" "}
              </label>
              <TextFieldInput
                size={"3"}
                variant="surface"
                color="crimson"
                id="dkp"
                type="number"
                {...register("dkp")}
              />
            </Flex>
            <Flex className="flex flex-col space-y-3">
              <label htmlFor="price" className="font-medium">
                قیمت :
              </label>
              <TextFieldRoot>
                <TextFieldSlot>
                  <TbCurrencyIranianRial width={16} height={16} />
                </TextFieldSlot>
                <TextFieldInput
                  size={"3"}
                  variant="surface"
                  color="crimson"
                  id="price"
                  type="number"
                  {...register("price")}
                />
              </TextFieldRoot>
            </Flex>

            <Flex className="flex flex-col space-y-3">
              <label htmlFor="categories" className="font-medium">
                دسته بندی کالا :
              </label>
              <SelectRoot size="3" onValueChange={(e) => setSelectValue(e)}>
                <SelectTrigger placeholder="دسته بندی کالا" id="categories" />
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Flex>

            <Flex gap="3" mt="4" justify="start">
              <DialogClose>
                <Button variant="soft" color="gray">
                  لغو
                </Button>
              </DialogClose>
                <Button type="submit">ثبت</Button>
            </Flex>
          </form>
        </DialogDescription>
      </DialogContent>
    </DialogRoot>
  );
};

export default AddProductModal;
