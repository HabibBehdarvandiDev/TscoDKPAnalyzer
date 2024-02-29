import React from "react";
import {
  Box,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
} from "@radix-ui/themes";
import { FiSearch } from "react-icons/fi";

const DigikalaFilters = ({ filters, onFilterChange }: any) => {
  const {
    priceDigikala,
    priceTsco,
    salesStatus,
    productNameSearch,
    sellerNameSearch,
  } = filters;

  return (
    <Box className="mb-3 flex gap-4 justify-center items-center">
      <SelectRoot
        size="3"
        onValueChange={(e) =>
          onFilterChange({ filterType: "priceDigikala", value: e })
        }
      >
        <SelectTrigger placeholder="قیمت دیجیکالا" />
        <SelectContent>
          <SelectItem value="default">بدون فیلتر</SelectItem>
          <SelectItem value="AZ">قیمت صعودی</SelectItem>
          <SelectItem value="ZA">قیمت نزولی</SelectItem>
        </SelectContent>
      </SelectRoot>

      <SelectRoot
        size="3"
        onValueChange={(e) =>
          onFilterChange({ filterType: "priceTsco", value: e })
        }
      >
        <SelectTrigger placeholder="قیمت تسکو" />
        <SelectContent>
          <SelectItem value="default">بدون فیلتر</SelectItem>
          <SelectItem value="AZ">قیمت صعودی</SelectItem>
          <SelectItem value="ZA">قیمت نزولی</SelectItem>
        </SelectContent>
      </SelectRoot>

      <SelectRoot
        size="3"
        onValueChange={(e) =>
          onFilterChange({ filterType: "salesStatus", value: e })
        }
      >
        <SelectTrigger placeholder="وضعیت فروش" />
        <SelectContent>
          <SelectItem value="default">بدون فیلتر</SelectItem>
          <SelectItem value="underselling">زیر فروشی</SelectItem>
          <SelectItem value="extortion">گران فروشی</SelectItem>
        </SelectContent>
      </SelectRoot>

      <TextFieldRoot size={"3"}>
        <TextFieldSlot>
          <FiSearch className="w-4 h-4" />
        </TextFieldSlot>
        <TextFieldInput
          placeholder="جستجو بر اساس نام کالا"
          value={productNameSearch}
          onChange={(e) =>
            onFilterChange({ filterType: "productNameSearch", value: e.target.value })
          }
        />
      </TextFieldRoot>

      <TextFieldRoot size={"3"}>
        <TextFieldSlot>
          <FiSearch className="w-4 h-4" />
        </TextFieldSlot>
        <TextFieldInput
          placeholder="جستجو بر اساس نام فروشنده"
          value={sellerNameSearch}
          onChange={(e) =>
            onFilterChange({ filterType: "sellerNameSearch", value: e.target.value })
          }
        />
      </TextFieldRoot>
    </Box>
  );
};

export default DigikalaFilters;
