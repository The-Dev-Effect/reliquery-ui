import * as React from "react";
import {useEffect, useState} from "react";
import {render} from "react-dom";
import ReactJson from 'react-json-view'
import {BrowserRouter as Router, Route, Switch, useParams,} from "react-router-dom";

import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Button,
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
import { base_path } from "./path_config";


type MetaData = Record<'name' | 'relic_type' | 'data_type' | 'size' | 'shape' | 'last_modified', string>

interface StorageNames {
    storage_names: string[]
}

interface RelicTypes {
    types: string[]
}

interface Relics {
    relics: string[]
}

interface Relic {
    name: string
    relic_type: string
    arrays: MetaData[]
    text: MetaData[]
    html: MetaData[]
    images: MetaData[]
    json: MetaData[]
    pandasdf: MetaData[]
    files: MetaData[]
}

const Relic = () => {
    // @ts-ignore
    const {name, relic_type, storage_name} = useParams();
    const [relic, setRelic] = useState<Relic>({
        name: '',
        relic_type: '',
        arrays: new Array<MetaData>(),
        text: new Array<MetaData>(),
        html: new Array<MetaData>(),
        images: new Array<MetaData>(),
        json: new Array<MetaData>(),
        pandasdf: new Array<MetaData>(),
        files: new Array<MetaData>(),
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
                                    <LinkOverlay isExternal={false}
                                                 href={relic.name + "/" + metaData.data_type + "/" + metaData.name}></LinkOverlay>
                                    {Object.keys(metaData).slice(1).map(key => (
                                        <Td>{metaData[key as keyof MetaData]}</Td>
                                    ))}
                                </LinkBox>
                            ))}
                        </Tbody>
                    </Table>
                </>);
        }
    }

    function createFilesTable(metaDatas: MetaData[]) {
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
                                <Tr>
                                    {Object.keys(metaData).map(key => (
                                        <Td>{metaData[key as keyof MetaData]}</Td>
                                        ))}
                                    <LinkBox as={Button}>
                                        Download
                                    <LinkOverlay isExternal={false}
                                        href={`${base_path}/api/reliquery/${storage_name}/${relic_type}/${name}/files/${metaData.name}`}></LinkOverlay>
                                    </LinkBox>
                                </Tr>
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
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <AccordionIcon/>
                                <Box flex="1" textAlign="left" m={2}>
                                    IMAGES({relic.images.length})
                                </Box>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            {createTable(relic.images)}
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <AccordionIcon/>
                                <Box flex="1" textAlign="left" m={2}>
                                    Json({relic.json.length}) 
                                </Box>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            {createTable(relic.json)}
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <AccordionIcon/>
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
                                <AccordionIcon/>
                                <Box flex="1" textAlign="left" m={2}>
                                    Files({relic.files.length}) 
                                </Box>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            {createFilesTable(relic.files)}
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
                `${base_path}/api/reliquery/${storage_name}/${relic_type}/${name}/${data_type}/${data_name}`
            );

            const json = await result.text();
            setData(json);
        };

        fetchData();
    }, []);

    if (data === '') {
        return <CircularProgress isIndeterminate/>;
    }

    if (data_type === "text" ) {
        
        return (
            <Box m={2}>
                <Heading as="h3" size="lg">{data_name}:</Heading>
                <Text fontSize="lg">{data}</Text>
            </Box>
        )
        }
    else if(data_type === "json"){
        return (
            <Box m={2}>
                <Heading as="h3" size="lg">{data_name}:</Heading>
                <ReactJson src={JSON.parse(data)} collapsed={true} theme={"monokai"}/>
            </Box>
        )
    } else{
        return (
            <Box m={2}>
                <div dangerouslySetInnerHTML={{__html: data}}/>
            </Box>
        );
    }
};

const RelicTypes = () => {
    // @ts-ignore
    const {storage_name} = useParams();
    const [types, setTypes] = useState<RelicTypes>({
        types: new Array<string>(),
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(
                `${base_path}/api/reliquery/${storage_name}`
            );
            
            const json = await result.json();
            setTypes(json);
        };

        fetchData();
    }, []);

    const type_links = []

    for (let type of types.types) {
        type_links.push(
            <Box as="button" ml="5" mr="5" mb="5" borderRadius="md" bg="lightslategrey" color="white" px={4} h={8}>
                <LinkBox>
                <LinkOverlay isExternal={false}
                                href={`${storage_name}/${type}`}>{type}</LinkOverlay>
                
                </LinkBox>
            </Box>
        );
    };

    return (
        <Box>
            <Heading bm="2">Relic Types</Heading>
            {type_links}
        </Box>
    )

}

const Relics = () => {
    // @ts-ignore
    const {storage_name, relic_type} = useParams();
    const [relics, setRelics] = useState<Relics>({
        relics: new Array<string>(),
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(
                `${base_path}/api/reliquery/${storage_name}/${relic_type}`
            );
            
            const json = await result.json();
            setRelics(json);
        };

        fetchData();
    }, []);

    const relicLinks = []

    for (let relic of relics.relics) {
        relicLinks.push(
            <Box as="button" ml="5" mr="5" mb="5" borderRadius="md" bg="lightslategrey" color="white" px={4} h={8}>
                <LinkBox>
                <LinkOverlay isExternal={false}
                                href={`${relic_type}/${relic}`}>{relic}</LinkOverlay>
                
                </LinkBox>
            </Box>
        );
    };

    return (
        <Box>
            <Heading bm="2">Relics</Heading>
            {relicLinks}
        </Box>
    )

}

const StorageList = () => {

    const [storages, setStorages] = useState<StorageNames>({
        storage_names: new Array<string>()
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(
                `${base_path}/api/reliquery`
            );
            
            const json = await result.json();
            setStorages(json);
        };

        fetchData();
    }, []);

    const storage_links = []

    for (let name of storages.storage_names) {
        storage_links.push(
            <Box as="button" ml="5" mr="5" mb="5" borderRadius="md" bg="lightslategrey" color="white" px={4} h={8}>
                <LinkBox>
                <LinkOverlay isExternal={false}
                                href={`reliquery/${name}`}>{name}</LinkOverlay>
                
                </LinkBox>
            </Box>
            
        )
    }
    
    return (
        <Box>
            <Heading mb="2" as="h6">Storages</Heading>
            {storage_links}
        </Box>
    )
}

const Root = () => {

    return (
        <Box as="button" borderRadius="md" bg="lightslategrey" color="white" px={4} h={8}>
            <LinkBox>
            <LinkOverlay isExternal={false}
                            href={"reliquery"}>Your Reliquery</LinkOverlay>
            
            </LinkBox>
        </Box>
    )
}

const App = () => {
        return (
            <ChakraProvider>
                <Router>
                    <div>
                    <LinkBox>
                        <LinkOverlay isExternal={false}
                                        href={"/"}>
                            <Heading as="h1" mb="5" size="4xl">Welcome to Reliquery!</Heading>
                        </LinkOverlay>
                    </LinkBox>
                        
                        <Switch>
                            <Route path="/reliquery/:storage_name/:relic_type/:name/:data_type/:data_name"
                                   children={<Data/>}/>
                            <Route path="/reliquery/:storage_name/:relic_type/:name" children={<Relic/>}/>
                            <Route path="/reliquery/:storage_name/:relic_type" children={<Relics/>}/>
                            <Route path="/reliquery/:storage_name" children={<RelicTypes/>}/>
                            <Route path="/reliquery" children={<StorageList/>}/>
                            <Route path="/" children={<Root/>}/>
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
