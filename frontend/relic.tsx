import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  CircularProgress,
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { base_path } from "./path_config";

type MetaData = Record<
  "name" | "relic_type" | "data_type" | "size" | "shape" | "last_modified",
  string
>;

interface Relic {
  name: string;
  relic_type: string;
  arrays: MetaData[];
  text: MetaData[];
  html: MetaData[];
  images: MetaData[];
  json: MetaData[];
  pandasdf: MetaData[];
  files: MetaData[];
  notebooks: MetaData[];
}

export const Relic = () => {
  // @ts-ignore
  const { name, relic_type, storage_name } = useParams();
  const [relic, setRelic] = useState<Relic>({
    name: "",
    relic_type: "",
    arrays: new Array<MetaData>(),
    text: new Array<MetaData>(),
    html: new Array<MetaData>(),
    images: new Array<MetaData>(),
    json: new Array<MetaData>(),
    pandasdf: new Array<MetaData>(),
    files: new Array<MetaData>(),
    notebooks: new Array<MetaData>(),
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        // TODO: Make this switch based on dev mode
        // We should add a setting that sets the base path (localhost:8000 vs 9000 and
        // or even remote (suppose we served this at something like api.reliquery.com)
        `${base_path}/api/reliquery/${storage_name}/${relic_type}/${name}`
      );

      const json = await result.json();
      setRelic(json);
    };

    fetchData();
  }, []);

  if (relic.name === "") {
    return <CircularProgress isIndeterminate />;
  }

  function createTable(metaDatas: MetaData[]) {
    if (metaDatas.length === 0) return "";
    else {
      return (
        <>
          <Table variant="simple">
            <Thead>
              <Tr>
                {Object.keys(metaDatas[0]).map((key) => (
                  <Th>{key}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {metaDatas.map((metaData) => (
                <LinkBox as={Tr}>
                  {Object.keys(metaData).map((key) => (
                    <Td>
                      <LinkOverlay
                        isExternal={true}
                        href={
                          relic.name +
                          "/" +
                          metaData.data_type +
                          "/" +
                          metaData.name
                        }
                      >
                        {metaData[key as keyof MetaData]}
                      </LinkOverlay>
                    </Td>
                  ))}
                </LinkBox>
              ))}
            </Tbody>
          </Table>
        </>
      );
    }
  }

  function createArrayTable(metaDatas: MetaData[]) {
    if (metaDatas.length === 0) return "";
    else {
      return (
        <>
          <Table variant="simple">
            <Thead>
              <Tr>
                {Object.keys(metaDatas[0]).map((key) => (
                  <Th>{key}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {metaDatas.map((metaData) => (
                <LinkBox as={Tr}>
                  {Object.keys(metaData).map((key) => (
                    <Td>{metaData[key as keyof MetaData]}</Td>
                  ))}
                </LinkBox>
              ))}
            </Tbody>
          </Table>
        </>
      );
    }
  }

  function createHtmlTable(metaDatas: MetaData[]) {
    if (metaDatas.length === 0) return "";
    else {
      return (
        <>
          <Table variant="simple">
            <Thead>
              <Tr>
                {Object.keys(metaDatas[0]).map((key) => (
                  <Th>{key}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {metaDatas.map((metaData) => (
                <LinkBox as={Tr}>
                  {Object.keys(metaData).map((key) => (
                    <Td>
                      <LinkOverlay
                        isExternal={true}
                        href={`${base_path}/api/reliquery/${storage_name}/${relic_type}/${name}/html/${metaData.name}`}
                      >
                        {metaData[key as keyof MetaData]}
                      </LinkOverlay>
                    </Td>
                  ))}
                </LinkBox>
              ))}
            </Tbody>
          </Table>
        </>
      );
    }
  }

  function createFilesTable(metaDatas: MetaData[]) {
    if (metaDatas.length === 0) return "";
    return (
      <>
        <Table variant="simple">
          <Thead>
            <Tr>
              {Object.keys(metaDatas[0]).map((key) => (
                <Th>{key}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {metaDatas.map((metaData) => (
              <Tr>
                {Object.keys(metaData).map((key) => (
                  <Td>{metaData[key as keyof MetaData]}</Td>
                ))}
                <LinkBox as={Button}>
                  Download
                  <LinkOverlay
                    isExternal={false}
                    href={`${base_path}/api/reliquery/${storage_name}/${relic_type}/${name}/files/${metaData.name}`}
                  ></LinkOverlay>
                </LinkBox>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </>
    );
  }

  function createNotebooksTable(metaDatas: MetaData[]) {
    if (metaDatas.length === 0) return "";
    return (
      <>
        <Table variant="simple">
          <Thead>
            <Tr>
              {Object.keys(metaDatas[0]).map((key) => (
                <Th>{key}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {metaDatas.map((metaData) => (
              <LinkBox as={Tr}>
                {Object.keys(metaData).map((key) => (
                  <Td>{metaData[key as keyof MetaData]}</Td>
                ))}
                <LinkOverlay
                  isExternal={false}
                  href={relic.name + "/notebooks-html/" + metaData.name}
                ></LinkOverlay>
                <LinkBox as={Button}>
                  Download
                  <LinkOverlay
                    isExternal={false}
                    href={`${base_path}/api/reliquery/${storage_name}/${relic_type}/${name}/notebooks/${metaData.name}`}
                  ></LinkOverlay>
                </LinkBox>
              </LinkBox>
            ))}
          </Tbody>
        </Table>
      </>
    );
  }

  return (
    <Box m={2}>
      <Breadcrumb fontWeight="medium" fontSize="sm">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard/relics">Relics</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Relic</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Stack spacing={3}>
        <Heading as="h4" size="sm">
          Name:
        </Heading>
        <Text fontSize="lg">{relic.name}</Text>
        <Heading as="h4" size="sm">
          Type:
        </Heading>
        <Text fontSize="lg">{relic.relic_type}</Text>
        <Accordion allowMultiple allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <AccordionIcon />
                <Box flex="1" textAlign="left" m={2}>
                  Array({relic.arrays.length})
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {createArrayTable(relic.arrays)}
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <AccordionIcon />
                <Box flex="1" textAlign="left" m={2}>
                  HTML({relic.html.length})
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {createHtmlTable(relic.html)}
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <AccordionIcon />
                <Box flex="1" textAlign="left" m={2}>
                  TEXT({relic.text.length})
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{createTable(relic.text)}</AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <AccordionIcon />
                <Box flex="1" textAlign="left" m={2}>
                  IMAGES({relic.images.length})
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{createTable(relic.images)}</AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <AccordionIcon />
                <Box flex="1" textAlign="left" m={2}>
                  Json({relic.json.length})
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{createTable(relic.json)}</AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <AccordionIcon />
                <Box flex="1" textAlign="left" m={2}>
                  Pandas DataFrame({relic.pandasdf.length})
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {createTable(relic.pandasdf)}
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <AccordionIcon />
                <Box flex="1" textAlign="left" m={2}>
                  Files({relic.files.length})
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {createFilesTable(relic.files)}
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <AccordionIcon />
                <Box flex="1" textAlign="left" m={2}>
                  Notebooks({relic.notebooks.length})
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {createNotebooksTable(relic.notebooks)}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </Box>
  );
};
