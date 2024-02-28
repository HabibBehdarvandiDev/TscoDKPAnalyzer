"use client";
import {
  Badge,
  Box,
  Flex,
  Heading,
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
  Text,
} from "@radix-ui/themes";
import { FaUser } from "react-icons/fa";
import { useUserContext } from "@/context/UserContext";

const Profile = () => {
  const { decodeAuthToken } = useUserContext();

  const user = decodeAuthToken();

  return (
    <HoverCardRoot>
      <HoverCardTrigger>
        <Flex className="p-1">
          <FaUser className="w-4 h-4 text-pink-600" />
        </Flex>
      </HoverCardTrigger>
      <HoverCardContent size={"2"}>
        <Flex gap="4">
          <Box>
            <Heading size="3" as="h3">
              سلام ،{user?.first_name}
            </Heading>
            <Text as="div" size="2" color="gray">
              {user?.username}@
            </Text>

            <Badge size={"1"} color="crimson" className="w-fit" mt={"3"}>
              @{user?.role}
            </Badge>
          </Box>
        </Flex>
      </HoverCardContent>
    </HoverCardRoot>
  );
};

export default Profile;
