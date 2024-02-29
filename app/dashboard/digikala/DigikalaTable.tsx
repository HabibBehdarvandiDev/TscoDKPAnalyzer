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
  TableRowHeaderCell,
  Text,
} from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import noDataImage from "@/public/images/noData.png";
import Image from "next/image";
import Link from "next/link";

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
  const [dkpArray, setDkpArray] = useState([]);
  const [recordData, setRecordData] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/product/dkp`).then((response) => {
      setDkpArray(response.data);
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const dataPromises = dkpArray.map(async (dkp) => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/digikala/${dkp}`
          );
          return response.data;
        } catch (error) {
          console.error(`Error fetching data for dkp ${dkp}:`, error);
          return null; // or handle error as needed
        }
      });

      const resolvedData = await Promise.all(dataPromises);
      setRecordData(resolvedData.filter((data) => data !== null));
    };

    fetchData();
  }, [dkpArray]);

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
      </TableHeader>
      <TableBody>
        {recordData.map((item, index) => (
          <TableRow key={index}>
          <TableRowHeaderCell className="text-center">
            <Flex justify="center" align="center" style={{ height: '100%' }}>
              {item.id}
            </Flex>
          </TableRowHeaderCell>
          <TableCell className="text-center">
            <Link href={item.image_url}>
              <Flex justify="center" align="center" style={{ height: '100%' }}>
                <Image
                  src={item.image_url}
                  alt={item.title}
                  width={70}
                  height={70}
                  className="mx-auto"
                />
              </Flex>
            </Link>
          </TableCell>
          <TableRowHeaderCell className="text-center">
            <Flex justify="center" align="center" style={{ height: '100%' }}>
              {item.dkp}
            </Flex>
          </TableRowHeaderCell>
          <TableRowHeaderCell className="text-center">
            <Flex justify="center" align="center" style={{ height: '100%' }}>
              {item.title}
            </Flex>
          </TableRowHeaderCell>
          <TableRowHeaderCell className="text-center">
            <Flex justify="center" align="center" style={{ height: '100%' }}>
              {item.digikala_price}
            </Flex>
          </TableRowHeaderCell>
          <TableRowHeaderCell className="text-center">
            <Flex justify="center" align="center" style={{ height: '100%' }}>
              {item.tsco_price}
            </Flex>
          </TableRowHeaderCell>
          <TableRowHeaderCell className="text-center">
            <Flex justify="center" align="center" style={{ height: '100%' }}>
              {item.product_category}
            </Flex>
          </TableRowHeaderCell>
          <TableRowHeaderCell className="text-center">
            <Flex justify="center" align="center" style={{ height: '100%' }}>
              {item.seller}
            </Flex>
          </TableRowHeaderCell>
        </TableRow>
        
        ))}
      </TableBody>
    </TableRoot>
  );
};

export default DigikalaTable;
