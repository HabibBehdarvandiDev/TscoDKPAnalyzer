"use client";
import { Box, Container } from "@radix-ui/themes";
import DigikalaTable from "./DigikalaTable";
import DigikalaFilters from "./DigikalaFilters";
import React from "react";

const DigikalaPage = () => {
  const [filters, setFilters] = React.useState({
    priceDigikala: "default",
    priceTsco: "default",
    salesStatus: "default",
    productNameSearch: "",
    sellerNameSearch: "",
  });

  const handleFilterChange = ({ filterType, value }: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  return (
    <>
      <Container size={"4"}>
        <Box>
          <DigikalaFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </Box>
        <Box>
          <DigikalaTable filters={filters} />
        </Box>
      </Container>
    </>
  );
};

export default DigikalaPage;
