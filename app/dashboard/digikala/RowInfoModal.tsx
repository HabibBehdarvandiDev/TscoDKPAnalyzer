import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import {
  DialogRoot,
  DialogTrigger,
  Button,
  DialogContent,
  DialogTitle,
  DialogDescription,
  Flex,
  DialogClose,
  Box,
  Text,
  TableRoot,
  TableHeader,
  TableColumnHeaderCell,
  TableBody,
  TableRow,
  TableRowHeaderCell,
  TableCell,
  Heading,
  Badge,
} from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";
import { FiInfo, FiTrash } from "react-icons/fi";

const RowInfoModal = ({ product }: any) => {
  return (
    <DialogRoot>
      <DialogTrigger>
        <Button variant="solid" color="red">
          <FiInfo className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent style={{ maxWidth: 800 }}>
        <DialogTitle className="uppercase" mb={"3"}>
          <Link href={`https://www.digikala.com/${product.product_url}`}>
            {product.product_name}
          </Link>
        </DialogTitle>
        <DialogDescription size="2" mb="4">
          <Flex>
            <Box className="ml-4 flex flex-col space-y-3">
              <Image
                src={product.image_url}
                alt={product.title}
                width={300}
                height={300}
              />
              <Text className="font-medium">
                امتیاز :{" "}
                <Badge color="yellow" variant="surface" size={"2"}>
                  {product.rating_value ? product.rating_value : "بدون امتیاز"}{" "}
                  <FaStar className="w-4 h-4" />
                </Badge>{" "}
              </Text>
            </Box>
            <Box className="flex flex-col space-y-5">
              <Text>
                <b>آیدی دیجیکالا (DKP):</b> {product.dkp}
              </Text>
              <Text>
                <b>نام کالا :</b> {product.title}
              </Text>
              <Text>
                <b>نام کالا در دیجیکالا :</b> {product.product_name}
              </Text>
              <Text>
                <b>خریداران :</b> {product.rating_count}
              </Text>
              <Text>
                <b>درصد رضایت خریداران :</b> {product.rating_rate}%
              </Text>
              <Text>
                <b>قیمت دیجیکالا :</b>{" "}
                {addCommas(digitsEnToFa(product.digikala_price))} ریال
              </Text>
              <Text>
                <b>قیمت تسکو :</b> {addCommas(digitsEnToFa(product.tsco_price))}{" "}
                ریال
              </Text>
              <Text>
                <b>دسته بندی کالا :</b> {product.product_category}
              </Text>
              <Text>
                <b>فروشنده :</b> {product.seller}
              </Text>
            </Box>
          </Flex>
          <Flex gap="3" mt="4" justify="end">
            <TableRoot variant="surface">
              <TableHeader>
                <TableColumnHeaderCell>دیدگاه ها</TableColumnHeaderCell>
                <TableColumnHeaderCell>
                  دیدگاه پیشنهاد شده
                </TableColumnHeaderCell>
                <TableColumnHeaderCell>دیدگاه رضایتمندی</TableColumnHeaderCell>
                <TableColumnHeaderCell>دیدگاه بدون نظر</TableColumnHeaderCell>
                <TableColumnHeaderCell>
                  دیدگاه نارضایتمندی
                </TableColumnHeaderCell>
                <TableColumnHeaderCell>
                  دیدگاه پیشنهاد نشده
                </TableColumnHeaderCell>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableRowHeaderCell
                    justify={"center"}
                    className="text-nowrap"
                  >
                    {product.rating_stats.total_reviews
                      ? product.rating_stats.total_reviews
                      : "ندارد"}
                  </TableRowHeaderCell>
                  <TableCell justify={"center"} className="text-nowrap">
                    {product.rating_stats.totally_satisfied_reviews
                      ? product.rating_stats.totally_satisfied_reviews
                      : "ندارد"}
                  </TableCell>
                  <TableCell justify={"center"} className="text-nowrap">
                    {product.rating_stats.satisfied_reviews
                      ? product.rating_stats.satisfied_reviews
                      : "ندارد"}
                  </TableCell>
                  <TableCell justify={"center"} className="text-nowrap">
                    {product.rating_stats.neutral_reviews
                      ? product.rating_stats.neutral_reviews
                      : "ندارد"}
                  </TableCell>
                  <TableCell justify={"center"} className="text-nowrap">
                    {product.rating_stats.dissatisfied_reviews
                      ? product.rating_stats.dissatisfied_reviews
                      : "ندارد"}
                  </TableCell>
                  <TableCell justify={"center"} className="text-nowrap">
                    {product.rating_stats.totally_dissatisfied_reviews
                      ? product.rating_stats.totally_dissatisfied_reviews
                      : "ندارد"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </TableRoot>
          </Flex>
        </DialogDescription>

        <Flex gap="3" mt="4" justify="start">
          <DialogClose>
            <Button>بستن</Button>
          </DialogClose>
        </Flex>
      </DialogContent>
    </DialogRoot>
  );
};

export default RowInfoModal;
