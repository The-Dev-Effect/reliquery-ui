import * as React from "react";
import {useEffect, useState} from "react";
import {render} from "react-dom";

import {BrowserRouter as Router, Route, Switch, useParams,} from "react-router-dom";

import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    ChakraProvider,
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
    Tr
} from "@chakra-ui/react"


type MetaData = Record<'name' | 'relic_type' | 'data_type' | 'size' | 'shape' | 'last_modified', string>

interface Relic {
    name: string
    relic_type: string
    arrays: MetaData[]
    text: MetaData[]
    html: MetaData[]
}

const Relic = () => {
    // @ts-ignore
    const {name, relic_type, storage_name} = useParams();
    const [relic, setRelic] = useState<Relic>({
        name: '',
        relic_type: '',
        arrays: new Array<MetaData>(),
        text: new Array<MetaData>(),
        html: new Array<MetaData>()
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(
                `/api/reliquery/${storage_name}/${relic_type}/${name}`
            );

            const json = await result.json();
            setRelic(json);
        };

        fetchData();
    }, []);

    if (relic.name === '') {
        return <CircularProgress isIndeterminate/>;
    }

    function createTable(metaDatas: MetaData[]) {
        if (metaDatas.length === 0)
            return "";
        else {
            return (
                <>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                {Object.keys(metaDatas[0]).map(key => (
                                    <Th>{key}</Th>
                                ))}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {metaDatas.map(metaData => (
                                <LinkBox as={Tr}>
                                    <LinkOverlay isExternal={true} href={metaData.data_type+"/"+metaData.name}></LinkOverlay>
                                    {Object.keys(metaData).map(key => (
                                        <Td>{metaData[key as keyof MetaData]}</Td>
                                    ))}
                                </LinkBox>
                            ))}
                        </Tbody>
                    </Table>
                </>);
        }


    }

    return (
        <Box m={2}>
            <Stack spacing={3}>
                <Heading as="h4" size="sm">Name:</Heading>
                <Text fontSize="lg">{relic.name}</Text>
                <Heading as="h4" size="sm">Type:</Heading>
                <Text fontSize="lg">{relic.relic_type}</Text>
                <Accordion allowMultiple allowToggle>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <AccordionIcon/>
                                <Box flex="1" textAlign="left" m={2}>
                                    Array({relic.arrays.length})
                                </Box>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            {createTable(relic.arrays)}
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <AccordionIcon/>
                                <Box flex="1" textAlign="left" m={2}>
                                    HTML({relic.html.length})
                                </Box>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            {createTable(relic.html)}
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <AccordionIcon/>
                                <Box flex="1" textAlign="left" m={2}>
                                    TEXT({relic.text.length})
                                </Box>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            {createTable(relic.text)}
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Stack>
        </Box>
    );
};

const Data = () => {
    // @ts-ignore
    const {storage_name, relic_type, name, data_type, data_name} = useParams();
    const [data, setData] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(
                `/api/reliquery/${storage_name}/${relic_type}/${name}/${data_type}/${data_name}`
            );

            const json = await result.text();
            setData(json);
        };

        fetchData();
    }, []);

    if (data === '') {
        return <CircularProgress isIndeterminate/>;
    }

    return (
        <Box m={2}>
            <div dangerouslySetInnerHTML={{__html: data}}/>
        </Box>
    );
};


const App = () => {
        return (
            <ChakraProvider>
                <Router>
                    <div>
                        <Heading>Welcome to Reliquery!</Heading>
                        <Switch>
                            <Route path="/reliquery/:storage_name/:relic_type/:name/:data_type/:data_name"
                                   children={<Data/>}/>
                            <Route path="/reliquery/:storage_name/:relic_type/:name" children={<Relic/>}/>
                        </Switch>
                    </div>
                </Router>
            </ChakraProvider>

        );
    }
;

render(
    <App/>
    , document.getElementById("root"));
