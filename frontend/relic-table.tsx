import * as React from "react";
import { useParams, withRouter } from "react-router";
import {useEffect, useState} from "react";
import {
    Box,
    Button,
    CircularProgress,
    Heading,
    LinkBox,
    LinkOverlay,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react"
import { base_path } from "./path_config";

type RelicName = Record<'name' | 'type' | 'storage', string>

interface RelicProps {
    relicType: string;
    storageName: string;
}

interface Relics {
    relics: RelicName[]
}

export const RelicTable = () => {
    //@ts-ignore
    const{relic_type, storage_name} = useParams();
    const [relics, setRelics] = useState<Relics>({
        relics: new Array<RelicName>(),
    });

    if (storage_name !== undefined && relic_type === undefined) {
        useEffect(() => {
            const fetchData = async () => {
                const result = await fetch(
                    `${base_path}/api/storages/${storage_name}`
                );
                
                const json = await result.json();
                setRelics(json);
            };

            fetchData();
        }, []);
    } else if (relic_type !== undefined && storage_name !== undefined) {
        useEffect(() => {
            const fetchData = async () => {
                const result = await fetch(
                    `${base_path}/api/relic-types/${storage_name}/${relic_type}`
                );
                
                const json = await result.json();
                setRelics(json);
            };

            fetchData();
        }, []);
    } else {
        useEffect(() => {
            const fetchData = async () => {
                const result = await fetch(
                    `${base_path}/api/reliquery`
                );
                
                const json = await result.json();
                setRelics(json);
            };

            fetchData();
        }, []);
    }

    if (relics.relics.length === 0) {
        return <CircularProgress isIndeterminate/>;
    }

    
    return (
        <Box a="center">
            <Table variant="striped">
                    <Thead>
                        <Heading size="2xl" p={"20px"}>Relics</Heading>
                    </Thead>
                    <Thead>
                        <Tr>
                            {Object.keys(relics.relics[0]).map(key => (
                                <Th>{key}</Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody >
                        {relics.relics.map(relic => (
                            <LinkBox as={Tr} transform="scale(1)">
                                {Object.keys(relic).map(key => (
                                    <Td>
                                        <LinkOverlay isExternal={false}
                                                href={`/dashboard/reliquery/${relic.storage}/${relic.type}/${relic.name}`}>{relic[key as keyof RelicName]}</LinkOverlay>

                                    </Td>
                                ))}
                            </LinkBox>
                        ))}
                    </Tbody>
                </Table>
            </Box>
    )
}
