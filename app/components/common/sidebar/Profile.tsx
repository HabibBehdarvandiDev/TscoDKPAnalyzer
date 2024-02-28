"use client";
import AvatarImage from "@/public/images/avatar.jpg";
import {
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
  Text,
} from "@radix-ui/themes";

const Profile = () => {
  return (
    <HoverCardRoot>
      <HoverCardTrigger>
        <Flex className="p-1">
          <Avatar
            src={AvatarImage.src}
            fallback="Image"
            className="shadow-primaryLight"
          />
        </Flex>
      </HoverCardTrigger>
      <HoverCardContent size={"2"}>
        <Flex gap="4">
          <Avatar
            src={AvatarImage.src}
            fallback="Image"
            className="rounded-full"
            size={"7"}
          />
          <Box>
            <Heading size="3" as="h3">
              Hi, 👋
            </Heading>
            <Text as="div" size="2" color="gray">
              @
            </Text>

            <Badge size={"1"} color="green" className="w-fit" mt={"3"}>
              @
            </Badge>
          </Box>
        </Flex>
      </HoverCardContent>
    </HoverCardRoot>
  );
};

export default Profile;
