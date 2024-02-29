import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import {
  TableRow,
  TableRowHeaderCell,
  Flex,
  TableCell,
} from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import RowActions from "./RowActions";

const DigikalaTableRow = ({ item }: any) => {
  return (
    <TableRow className="font-medium">
      <TableRowHeaderCell className="text-center">
        <Link href={item.image_url}>
          <Flex justify="center" align="center" style={{ height: "100%" }}>
            <Image
              src={item.image_url}
              alt={item.title}
              width={70}
              height={70}
              className="mx-auto"
            />
          </Flex>
        </Link>
      </TableRowHeaderCell>
      <TableCell className="text-center">
        <Flex justify="center" align="center" style={{ height: "100%" }}>
          {item.dkp}
        </Flex>
      </TableCell>
      <TableCell className="text-center uppercase">
        <Flex justify="center" align="center" style={{ height: "100%" }}>
          {item.title}
        </Flex>
      </TableCell>
      <TableCell className="text-center">
        <Flex justify="center" align="center" style={{ height: "100%" }}>
          ریال {addCommas(digitsEnToFa(item.digikala_price))}
        </Flex>
      </TableCell>
      <TableCell className="text-center">
        <Flex justify="center" align="center" style={{ height: "100%" }}>
          ریال {addCommas(digitsEnToFa(item.tsco_price))}
        </Flex>
      </TableCell>
      <TableCell className="text-center">
        <Flex justify="center" align="center" style={{ height: "100%" }}>
          {item.product_category}
        </Flex>
      </TableCell>
      <TableCell className="text-center">
        <Flex justify="center" align="center" style={{ height: "100%" }}>
          {item.seller}
        </Flex>
      </TableCell>
      <TableCell className="text-center">
        <RowActions item={item} />
      </TableCell>
    </TableRow>
  );
};

export default DigikalaTableRow;
