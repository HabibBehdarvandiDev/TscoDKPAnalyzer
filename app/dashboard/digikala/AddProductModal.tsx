"use client";

import Callout from "@/app/components/Callout";
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
  TextFieldSlot,
} from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TbCurrencyIranianRial } from "react-icons/tb";

const AddProductModal = () => {
  const [selectValue, setSelectValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const warningMessage =
    "لطفا بعداز کلیک کردن بر روی گزینه ثبت، صفحه را دوباره بارگزاری کنید تا اطلاعات بروز شوند.";

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    const payload = {
      product_name: data.productName,
      dkp: parseInt(data.dkp),
      price: data.price,
      product_category: selectValue,
    };

    try {
      const response = await axios.post("/api/product", payload);
      if (response.status === 200) {
        setOpen(false);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = Object.keys(ProductCategory);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DialogRoot open={open}>
      <DialogTrigger>
        <Button size={"3"} variant="surface" color="red" onClick={handleOpen}>
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
                autoComplete="off"
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
              <Button variant="soft" color="gray" onClick={handleClose}>
                لغو
              </Button>
              <Button type="submit" disabled={loading} onClick={handleClose}>
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
            <Flex justify={"center"}>
              <Callout
                color="yellow"
                text={warningMessage}
                size="1"
                variant="soft"
              />
            </Flex>
          </form>
        </DialogDescription>
      </DialogContent>
    </DialogRoot>
  );
};

export default AddProductModal;
