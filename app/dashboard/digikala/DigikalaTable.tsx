"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DigikalaTableRow from "./DigikalaTableRow";
import {
  TableBody,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  Text,
} from "@radix-ui/themes";

const tableHeader = [
  "Image",
  "dkp",
  "title",
  "Digikala Price",
  "Tsco Online Price",
  "Category",
  "Seller Name",
];

const DigikalaTable = ({ filters }: any) => {
  const {
    priceDigikala,
    priceTsco,
    salesStatus,
    productNameSearch,
    sellerNameSearch,
  } = filters;
  const [dkpArray, setDkpArray] = useState([]);
  const [recordData, setRecordData] = useState([]);

  // Fetch DKP Array from DB
  useEffect(() => {
    axios.get(`http://localhost:3000/api/product/dkp`).then((response) => {
      setDkpArray(response.data);
    });
  }, []);

  // Fetch info about products from API and merge with DB info
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

      // Filter data based on filter values
      let filteredData: any = resolvedData;

      if (priceDigikala === "default") {
        filteredData = resolvedData;
      } else if (priceDigikala === "AZ") {
        filteredData = [...resolvedData].sort(
          (a, b) => a.digikala_price - b.digikala_price
        );
      } else if (priceDigikala === "ZA") {
        filteredData = [...resolvedData].sort(
          (a, b) => b.digikala_price - a.digikala_price
        );
      }

      if (priceTsco === "default") {
        filteredData = filteredData;
      } else if (priceTsco === "AZ") {
        filteredData = [...filteredData].sort(
          (a, b) => a.tsco_price - b.tsco_price
        );
      } else if (priceTsco === "ZA") {
        filteredData = [...filteredData].sort(
          (a, b) => b.tsco_price - a.tsco_price
        );
      }

      if (salesStatus === "default") {
        filteredData = filteredData;
      } else if (salesStatus === "underselling") {
        filteredData = [...filteredData].filter(
          (item: any) => item.digikala_price < item.tsco_price
        );
      } else if (salesStatus === "extortion") {
        filteredData = [...filteredData].filter(
          (item: any) => item.digikala_price > item.tsco_price
        );
      }

      // Sorting based on productNameSearch
      if (productNameSearch) {
        filteredData = [...filteredData].filter((item) =>
          item.title.toLowerCase().includes(productNameSearch.toLowerCase())
        );
      }

      // Sorting based on sellerNameSearch
      if (sellerNameSearch) {
        filteredData = [...filteredData].filter((item) =>
          item.seller.toLowerCase().includes(sellerNameSearch.toLowerCase())
        );
      }

      setRecordData(filteredData);
    };

    fetchData();
  }, [
    dkpArray,
    filters,
    priceDigikala,
    priceTsco,
    salesStatus,
    productNameSearch,
    sellerNameSearch,
  ]);

  return (
    <>
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
            <DigikalaTableRow item={item} key={index} />
          ))}
        </TableBody>
      </TableRoot>
    </>
  );
};

export default DigikalaTable;
