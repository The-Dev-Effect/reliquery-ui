import * as React from "react";
import { useEffect, useState } from "react";
import {
    Box,
    CircularProgress,
    Heading,
    LinkBox,
    LinkOverlay,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react"
import { base_path } from "./path_config";

type RelicType = Record<'type' | 'storage', string>

interface RelicTypes {
    types: RelicType[]

}

export const RelicTypeTable = () => {
    const [types, setTypes] = useState<RelicTypes>({
        types: new Array<RelicType>(),
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(
                `${base_path}/api/relic-types`
            );

            const json = await result.json();
            setTypes(json);
        };

        fetchData();
    }, []);

    if (types.types.length === 0) {
        return <CircularProgress isIndeterminate />;
    }

    return (
        <Box a="center">
            <Table variant="striped">
                <Thead>
                    <Heading size="2xl" p={"20px"}>Relic Types</Heading>
                </Thead>
                <Thead>
                    <Tr>
                        {Object.keys(types.types[0]).map(key => (
                            <Th>{key}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody >
                    {types.types.map(type => (
                        <LinkBox as={Tr} transform="scale(1)">
                            {Object.keys(type).map(key => (
                                <Td>
                                    <LinkOverlay isExternal={false}
                                        href={`/dashboard/relic-types/${type.storage}/${type.type}`}>{type[key as keyof RelicType]}</LinkOverlay>

                                </Td>
                            ))}
                        </LinkBox>
                    ))}
                </Tbody>
            </Table>
        </Box>
    )
}