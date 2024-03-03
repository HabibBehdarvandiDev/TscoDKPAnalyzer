"use client";

import Spinner from "@/app/components/Spinner";
import { ProductCategory } from "@prisma/client";
import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Flex,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot
} from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TbCurrencyIranianRial } from "react-icons/tb";

const AddProductModal = () => {
  const [selectValue, setSelectValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(true);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    setLoading(true);
    const payload = {
      product_name: data.productName,
      dkp: parseInt(data.dkp),
      price: data.price,
      product_category: selectValue,
    };
    console.log(payload);

    const response = axios.post("/api/product", payload).then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        setLoading(false);
        setSuccess(true);
      } else {
        setLoading(false);
        setSuccess(false);
      }
    });
  };

  const categories = Object.keys(ProductCategory);

  return (
    <DialogRoot>
      <DialogTrigger>
        <Button size={"3"} variant="surface" color="red">
          ایجاد کالا
        </Button>
      </DialogTrigger>

      <DialogContent style={{ maxWidth: 450 }}>
        <DialogTitle className="uppercase">ایجاد کالای جدید</DialogTitle>
        <DialogDescription size="2" mb="4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-3"
          >
            <Flex className="flex flex-col space-y-3">
              <label htmlFor="Product Name" className="font-medium">
                نام کالا :{" "}
              </label>
              <TextFieldInput
                size={"3"}
                variant="surface"
                color="red"
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
                color="red"
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
                  color="red"
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
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Spinner
                    width={4}
                    height={4}
                    ringColor="white"
                    ringBg="gray"
                  />
                ) : (
                  "ثبت"
                )}
              </Button>
            </Flex>
          </form>
        </DialogDescription>
      </DialogContent>
    </DialogRoot>
  );
};

export default AddProductModal;
