"use client";
import Callout from "@/app/components/Callout";
import Spinner from "@/app/components/Spinner";
import { useUserContext } from "@/context/UserContext";
import Logo from "@/public/logo/logo_dark.png";
import {
  Avatar,
  Badge,
  Button,
  Flex,
  Heading,
  Separator,
  Text,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
} from "@radix-ui/themes";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { MdError, MdKey } from "react-icons/md";

const LoginForm = () => {
  const [error, setError] = useState<boolean>(false);
  const [isSendingData, setIsSendingData] = useState<boolean>(false);
  const { setAuth } = useUserContext();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setIsSendingData(true);
    try {
      console.log(data);
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        data
      );

      setAuth(res.data.authToken);
      sessionStorage.setItem("authToken", res.data.authToken);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      setError(true);
      setIsSendingData(false);
    }
  };

  return (
    <form
      className="min-w-[448px] h-fit self-center p-6 m-2 rounded-2xl space-y-5 flex flex-col shadow-sm border border-red-600 border-opacity-35"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Flex gap="2" className="self-center w-44">
        <Image src={Logo} alt="Logo png" />
      </Flex>

      <TextFieldRoot>
        <TextFieldSlot>
          <FaUser width={16} height={16} />
        </TextFieldSlot>
        <TextFieldInput
          placeholder="نام کاربری"
          size={"3"}
          {...register("username", {
            required: {
              value: true,
              message: "نام کاربری نباید خالی باشد",
            },
            maxLength: {
              value: 25,
              message: "نام کاربری نباید بیشتر از 25 کارکتر باشد",
            },
            minLength: {
              value: 4,
              message: "نام کاربری نباید کمتر از 3 کاراکتر باشد",
            },
          })}
        ></TextFieldInput>
      </TextFieldRoot>

      <TextFieldRoot>
        <TextFieldSlot>
          <MdKey width={16} height={16} />
        </TextFieldSlot>
        <TextFieldInput
          placeholder="رمز ورود"
          type="password"
          size={"3"}
          {...register("password", {
            required: {
              value: true,
              message: "رمز عبور نباید خالی باشد",
            },
            maxLength: {
              value: 25,
              message: "رمز عبور باید کمتر از 25 کاراکتر باشد",
            },
            minLength: {
              value: 8,
              message: "رمز عبور باید بیشتر از 8 کاراکتر باشد",
            },
          })}
        ></TextFieldInput>
      </TextFieldRoot>

      <Flex gap="2" direction={"column"}>
        {errors.username && (
          <Text className="text-red-500 text-sm flex items-center">
            <MdError width={4} height={4} className="mr-2" />
            {!errors.username?.message}
          </Text>
        )}
        {errors.password && (
          <Text className="text-red-500 text-sm flex items-center">
            <MdError width={4} height={4} className="mr-2" />
          </Text>
        )}
      </Flex>

      <Link href={"/"} className="text-sm text-red-600 hover:text-red-700">
        رمز خود را فراموش کردید؟ کلیک کنید
      </Link>

      <Button
        className="w-full cursor-pointer"
        size={"3"}
        disabled={isSendingData}
      >
        ورود{" "}
        {isSendingData ? (
          <Spinner width={4} height={4} ringBg="gray" ringColor="white" />
        ) : null}
      </Button>

      {error && (
        <Callout
          text="مشکل در برقراری ارتباط با سرور. لطفا با پشتیبانی تماس بگیرید"
          color="red"
          icon={<MdError width={16} height={16} />}
          size="2"
          variant="soft"
        />
      )}

      <Separator my={"3"} size={"4"} className="w-full" />

      <Flex className="w-full" justify={"center"}>
        <Text className="text-sm">
          All the Rights are Received by <Badge color="red">HabibDev</Badge>{" "}
          ©Copyright
        </Text>
      </Flex>
    </form>
  );
};

export default LoginForm;
