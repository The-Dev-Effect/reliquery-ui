import * as React from "react";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Stack,
  LinkOverlay,
  Icon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";

import { FiDatabase, FiType, FiBox } from "react-icons/fi";
import { IconType } from "react-icons";

interface CardItemProps {
  name: string;
  icon: IconType;
  ref: string;
}
const CardItems: Array<CardItemProps> = [
  { name: "Relics", icon: FiBox, ref: "/dashboard/relics" },
  { name: "Relic Types", icon: FiType, ref: "/dashboard/relic-types" },
  { name: "Storages", icon: FiDatabase, ref: "/dashboard/storages" },
];

export const DashboardCard = () => {
  return (
    <Box>
      <Breadcrumb fontWeight="medium" fontSize="sm">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Center py={12}>
        {CardItems.map((card) => (
          <Box
            role={"group"}
            p={6}
            maxW={"330px"}
            w={"full"}
            bg={useColorModeValue("white", "gray.800")}
            boxShadow={"2xl"}
            rounded={"lg"}
            pos={"relative"}
            zIndex={1}
          >
            <Stack pt={10} align={"center"}>
              <LinkOverlay href={card.ref} isExternal={false}></LinkOverlay>
              <Icon
                mr="4"
                fontSize="108"
                _groupHover={{
                  color: "orange",
                }}
                as={card.icon}
              />
              <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
                {card.name}
              </Heading>
            </Stack>
          </Box>
        ))}
      </Center>
    </Box>
  );
};
