"use client";
import Callout from "@/app/components/Callout";
import Spinner from "@/app/components/Spinner";
import Logo from "@/public/logo/logo.png";
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

      console.log(res.data);
      sessionStorage.setItem("authToken", res.data.authToken);
      router.push("/dashboard");
      setIsSendingData(false);
    } catch (error) {
      setError(true);
      setIsSendingData(false);
    }
  };

  return (
    <form
      className="min-w-[448px] h-fit self-center p-6 m-2 rounded-2xl space-y-5 flex flex-col shadow-sm border border-pink-600 border-opacity-35"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Flex gap="2" className="self-center w-80">
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
              message: "Username is required",
            },
            maxLength: {
              value: 25,
              message: "Username cannot be more than 25 characters",
            },
            minLength: {
              value: 4,
              message: "Username cannot be less than 4 characters",
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
              message: "Password is required",
            },
            maxLength: {
              value: 25,
              message: "Password cannot be more than 25 characters",
            },
            minLength: {
              value: 8,
              message: "Password cannot be less than 8 characters",
            },
          })}
        ></TextFieldInput>
      </TextFieldRoot>

      <Flex gap="2" direction={"column"}>
        {errors.username && (
          <Text className="text-danger text-sm flex items-center">
            <MdError width={4} height={4} className="mr-2" />{" "}
            {errors.username?.message}
          </Text>
        )}
        {errors.password && (
          <Text className="text-danger text-sm flex items-center">
            <MdError width={4} height={4} className="mr-2" />{" "}
            {errors.password?.message}
          </Text>
        )}
      </Flex>

      <Link href={"/"} className="text-sm text-pink-600 hover:text-pink-700">
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
          text="Error happened while logging in. Please try again later."
          color="pink"
          icon={<MdError width={16} height={16} />}
          size="2"
          variant="soft"
        />
      )}

      <Separator my={"3"} size={"4"} className="w-full" />

      <Flex className="w-full">
        <Text className="text-sm">
          All the Rights are Received by <Badge color="pink">HabibDev</Badge>{" "}
          ©Copyright
        </Text>
      </Flex>
    </form>
  );
};

export default LoginForm;
