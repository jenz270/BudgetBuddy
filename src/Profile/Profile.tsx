import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { getAuth, signOut, updateEmail, updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { UserContext } from "../config/Context";
import {
  EMAIL,
  LOGOUT,
  NAME,
  PROFILE,
  SAVE_CHANGES,
  USER_PROFILE_UPDATE_ERROR,
} from "../utils/constants";

type Props = {};

const Profile = (props: Props) => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [name, setName] = useState(user?.displayName);
  const [email, setEmail] = useState(user?.email);
  const { setUserName, setUserEmail } = useContext(UserContext);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSaveChanges = async () => {
    if (user) {
      try {
        if (name != user.displayName) {
          const newName = name || "";
          await updateProfile(user, { displayName: newName });
          setUserName(newName);
        }

        if (email != user.email) {
          const newEmail = email || "";
          await updateEmail(user, newEmail);
          setUserEmail(newEmail);
        }
      } catch (error) {
        console.error({ USER_PROFILE_UPDATE_ERROR }, error);
      }
    } else {
      console.log("No user is currently signed in");
    }
  };

  return (
    <Flex marginTop="2.5vh" flexDir="column" alignItems="flex-start" w="full">
      <Flex
        flexDir="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Text as="b" fontSize="2xl" color="dark">
          {PROFILE}
        </Text>
        <Button
          mr={5}
          as="b"
          colorScheme="orange"
          onClick={() => signOut(auth)}
        >
          {LOGOUT}
        </Button>
      </Flex>
      <Flex flexDir="column">
        <Text mt="20px" mb="8px">
          {NAME}
        </Text>
        <Input
          value={name || ""}
          onChange={handleNameChange}
          placeholder="Name"
          size="md"
        />
        <Text mt="20px" mb="8px">
          {EMAIL}
        </Text>
        <Input
          value={email || ""}
          onChange={handleEmailChange}
          placeholder="Email"
          size="md"
        />
        <Button mt={10} mr={5} colorScheme="orange" onClick={handleSaveChanges}>
           {SAVE_CHANGES}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Profile;
