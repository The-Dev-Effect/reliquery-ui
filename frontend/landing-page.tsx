
import {
  Box,
  Heading,
  Code,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  Link,
  LinkOverlay,
} from '@chakra-ui/react';

import * as React from 'react';

export const LandingPage = () => {
  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Welcome to Reliquery <br />
            <Text color={'orange.300'} size="sm">
              Science's Artifact Anti-format
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            An anti-format storage tool aimed towards supporting scientists. Giving them the ability to store data how they want and where they want.
          </Text>
          <Code>$ pip install reliquery</Code>
          <Text color={'gray.500'}>
            To get started pip install <Link href="https://github.com/The-Dev-Effect/reliquery" color={"orange.500"}>Reliquery</Link>
            and start adding data to a Relic. You can then view that data on your Reliquery dashboard.
          </Text>

          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Box>
              <Button
                colorScheme={'green'}
                bg={'green.400'}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: 'green.500',
                }}>
                <LinkOverlay href="dashboard" isExternal={false}></LinkOverlay>
                Reliquery Dashboard
              </Button>
            </Box>
            <Box>
              <Button variant={'link'} colorScheme={'blue'} size={'sm'} >
                <LinkOverlay href="https://github.com/The-Dev-Effect/reliquery-ui" isExternal={true}></LinkOverlay>
                Learn more
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
