import { Flex, Icon, Link, Menu, MenuButton, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  navSize: string;
  icon: React.ElementType;
  title: string;
  active: boolean;
  onClick: () => void;
};

const SideBarItem = ({ navSize, icon, title, active, onClick }: Props) => {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
          backgroundColor={active ? "darkHighlight" : ""}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "darkHighlight" }}
          w={navSize === "large" ? "100%" : "65%"}
          onClick={onClick}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon as={icon} fontSize="xl" color="backgroundDark" />
              <Text
                as="b"
                ml={5}
                display={navSize === "small" ? "none" : "flex"}
                color="backgroundDark"
              >
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
};

export default SideBarItem;
