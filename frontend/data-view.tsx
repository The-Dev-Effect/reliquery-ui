import { CircularProgress, Box, Heading, Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import * as React from "react";
import { useState, useEffect } from "react";
import ReactJson from "react-json-view";
import { base_path } from "./path_config";
import { useParams } from "react-router";

interface DataParams {
    storage_name: string;
    relic_type: string;
    name: string;
    data_type: string;
    data_name: string;
}

export const Data = () => {
    const { storage_name, relic_type, name, data_type, data_name } = useParams<DataParams>();
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

    const DataBreadcrumb = () => {
        return (
            <Breadcrumb fontWeight='medium' fontSize='sm'>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink href='/dashboard'>Dashboard</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink href='/dashboard/relics'>Relics</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink href={`/dashboard/reliquery/${storage_name}/${relic_type}/${name}`}>Relic</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>{data_type}</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
        )
    }

    if (data === '') {
        return <CircularProgress isIndeterminate />;
    }

    if (data_type === "text") {

        return (
            <Box m={2}>
                <DataBreadcrumb />
                <Heading as="h3" size="lg">{data_name}:</Heading>
                <Text fontSize="lg">{data}</Text>
            </Box>
        )
    }
    else if (data_type === "json") {
        return (
            <Box m={2}>
                <DataBreadcrumb />
                <Heading as="h3" size="lg">{data_name}:</Heading>
                <ReactJson src={JSON.parse(data)} collapsed={true} theme={"monokai"} />
            </Box>
        )
    } else {
        return (
            <Box m={2}>
                <DataBreadcrumb />
                <div dangerouslySetInnerHTML={{ __html: data }} />
            </Box>
        );
    }
};