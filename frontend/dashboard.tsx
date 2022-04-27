import { Box } from "@chakra-ui/layout";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { DashboardCard } from "./dashboard-card";
import { Data } from "./data-view";
import { Relic } from "./relic";
import { RelicTable } from "./relic-table";
import { RelicTypeTable } from "./relic-type-table";
import SidebarWithHeader from "./sidebar";
import { StorageTable } from "./storage-table";
import { useColorModeValue } from "@chakra-ui/color-mode";

const DashboardBody = () => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      border={"solid"}
      borderColor={"gray.400"}
      m={"5px"}
    >
      <Switch>
        <Route
          path="/dashboard/reliquery/:storage_name/:relic_type/:name/:data_type/:data_name"
          children={<Data />}
        />
        <Route
          path="/dashboard/relic-types/:storage_name/:relic_type"
          children={<RelicTable />}
        />
        <Route
          path="/dashboard/storages/:storage_name"
          children={<RelicTable />}
        />
        <Route
          path="/dashboard/reliquery/:storage_name/:relic_type/:name"
          children={<Relic />}
        />
        <Route path="/dashboard/relics" children={<RelicTable />} />
        <Route path="/dashboard/relic-types" children={<RelicTypeTable />} />
        <Route path="/dashboard/storages" children={<StorageTable />} />
        <Route path="/dashboard" children={<DashboardCard />} />
      </Switch>
    </Box>
  );
};

export const Dashboard = () => {
  return (
    <>
      <SidebarWithHeader children={<DashboardBody />} />
    </>
  );
};
