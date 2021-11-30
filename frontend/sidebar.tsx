import * as React from 'react';
import { useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Switch, useParams,} from "react-router-dom";
import { 
    useRef,
    ReactNode,
    ReactText,
 } from 'react';
import { base_path } from "./path_config";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  Icon,
  Image,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Heading,
  Button,
  useToast,
} from '@chakra-ui/react';
import {
  FiHome,
  FiMenu,
  FiDatabase,
  FiType,
  FiBox,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import logo from './static/array.png';

interface LinkItemProps {
  name: string;
  icon: IconType;
  ref: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, ref: '/'},
  { name: 'Relics', icon: FiBox, ref: '/dashboard/relics'},
  { name: 'Relic Types', icon: FiType, ref: "/dashboard/relic-types" },
  { name: 'Storages', icon: FiDatabase, ref: "/dashboard/storages" },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <HStack>
        <Image src={logo} alt="Reliquery Logo" blockSize="50px"></Image>
        <Heading size="md">Reliquery</Heading>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </HStack>
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} link={link.ref}>
            {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  link: string;
}
const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  return (
    <Link href={link} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const SyncReplyToast = () => {
  const toast = useToast()
  const [success, setSuccess] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchData = async () => {
        const result = await fetch(
            `${base_path}/api/sync_reliquery`
        );

        if (result.status === 200) {
          setSuccess(true)
        }
    };

    fetchData();
  }, []);
  
  return (
        <Button bg="orange.300" color="teal.300"
          onClick={() =>
            toast({
              title: `sync reliquery`,
              status: success ? "success" : "error",
              isClosable: true,
            })
          }
        >
          Sync Reliquery
        </Button>
  )
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const toast = useToast()

  const toastSuccess = async() => {
    const result = await fetch(
        `${base_path}/api/sync_reliquery`
    );

    toast({
      title: `sync reliquery`,
      status: result.status === 200 ? "success" : "error",
      isClosable: true,
    })
  }

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

        <HStack spacing={{ base: '0', md: '6' }}>
          <Button bg="orange.200"
            onClick={toastSuccess}
          >
            Sync Reliquery
          </Button>
        </HStack>
    </Flex>
  );
};

function useFetch() {
  throw new Error('Function not implemented.');
}
