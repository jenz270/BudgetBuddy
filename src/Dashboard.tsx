import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar/SideBar";

const Dashboard = () => {
  return (
    <Flex flexDir="row" gap="6" width="100%" height="100%">
      <Flex bg="background" flexShrink={0} height="100vh">
        <Sidebar />
      </Flex>
      <Flex flex="1">
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default Dashboard;
