"use client";
import {
  Badge,
  Flex,
  Heading,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  TableRow,
  Text,
} from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect } from "react";
import { format } from "date-fns";
import noDataImage from "@/public/images/noData.png";
import Image from "next/image";
import TableRecord from "./TableRecord";

const tableHeader = [
  "#",
  "Image",
  "dkp",
  "title",
  "Digikala Price",
  "Tsco Online Price",
  "Category",
  "Seller Name",
];

const DigikalaTable = () => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [error, setError] = React.useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/api/product/dkp`).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <TableRoot variant="surface">
      <TableHeader>
        {tableHeader.map((header, index) => (
          <TableColumnHeaderCell
            className="text-center text-nowrap"
            key={index}
          >
            <Text>{header}</Text>
          </TableColumnHeaderCell>
        ))}

        <TableBody>
          
        </TableBody>
      </TableHeader>
    </TableRoot>
  );
};

export default DigikalaTable;
