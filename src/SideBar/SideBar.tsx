import {
  Avatar,
  Divider,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import {
  BanknotesIcon,
  Bars3Icon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.png";
import { UserContext } from "../config/Context";
import SideBarItem from "./SideBarItem";
import { ADMIN } from "../utils/constants";

const Sidebar = () => {
  const [navSize, setNavSize] = useState("large");
  const [activeItem, setActiveItem] = useState("");
  const { userName, userEmail } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Use a switch statement or if-else to handle navigation based on activeItem
    switch (activeItem) {
      case "Home":
        navigate("/");
        break;
      case "Profile":
        navigate("/profile");
        break;
      case "Expenses":
        navigate("/expenses");
        break;
      default:
        // Handle default case or do nothing
        break;
    }
  }, [activeItem, navigate]);

  const hamburgerIconClicked = () => {
    if (navSize == "small") {
      setNavSize("large");
    } else {
      setNavSize("small");
    }
  };

  const handleItemClick = (item: SetStateAction<string>) => {
    setActiveItem(item);
  };

  return (
    <Flex
      pos="sticky"
      left="5"
      h="100%"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize === "small" ? "15px" : "30px"}
      w={navSize === "small" ? "100px" : "250px"}
      flexDir="column"
      justifyContent="space-between"
      overflow="hidden"
    >
      <Flex
        p="5%"
        flexDir="column"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
      >
        <IconButton
          background="none"
          _hover={{ background: "none" }}
          icon={<Bars3Icon />}
          onClick={hamburgerIconClicked}
          aria-label="Toggle Navigation Menu"
        />

        {/* HOME */}
        <SideBarItem
          navSize={navSize}
          icon={HomeIcon}
          title="Home"
          active={false}
          onClick={() => handleItemClick("Home")}
        />
        {/* EXPENSES */}
        <SideBarItem
          navSize={navSize}
          icon={BanknotesIcon}
          title="Expenses"
          active={activeItem === "Expenses"}
          onClick={() => handleItemClick("Expenses")}
        />
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={navSize == "small" ? "none" : "flex"} />
        <Flex mt={4} align="center" onClick={() => handleItemClick("Profile")}>
          <Avatar size="sm" src={avatar} />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize == "small" ? "none" : "flex"}
          >
            <Heading
              as="h3"
              size="sm"
              style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
            >
              {userName == "" ? userEmail : userName}
            </Heading>
            <Text color="gray">{ADMIN}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
