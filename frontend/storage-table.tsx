import { Box } from "@chakra-ui/layout"
import { LinkBox, LinkOverlay, Heading, Table, Tbody, Td, Th, Thead, Tr, CircularProgress } from "@chakra-ui/react";
import * as React from "react"
import { base_path } from "./path_config";
import { useState, useEffect } from "react";

type StorageName = Record<"storage_name", string>;

interface StorageNames {
    storage_names: StorageName[]
}

export const StorageTable = () => {
    const [storages, setStorages] = useState<StorageNames>({
        storage_names: new Array<StorageName>()
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(
                `${base_path}/api/storages`
            );

            const json = await result.json();
            setStorages(json);
        };

        fetchData();
    }, []);

    if (storages.storage_names.length === 0) {
        return <CircularProgress isIndeterminate />;
    }

    return (
        <Box a="center">
            <Table variant="striped">
                <Thead>
                    <Heading size="2xl" p={"20px"}>Storage Names</Heading>
                </Thead>
                <Thead>
                    <Tr>
                        {Object.keys(storages.storage_names[0]).map(key => (
                            <Th>{key}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody >
                    {storages.storage_names.map(storage => (
                        <LinkBox as={Tr} transform="scale(1)">
                            {Object.keys(storage).map(key => (
                                <Td>
                                    <LinkOverlay isExternal={false}
                                        href={`/dashboard/storages/${storage.storage_name}`}>{storage[key as keyof StorageName]}</LinkOverlay>
                                </Td>
                            ))}
                        </LinkBox>
                    ))}
                </Tbody>
            </Table>
        </Box>
    )
}

