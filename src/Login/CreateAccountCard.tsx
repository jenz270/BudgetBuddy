{
  /* THINGS TO DO:
- Add better error checking mechanism
- Add a check box for agreeing to terms of service and privacy policy
- Make the size of the login page the same as this card & also make sure the account confirmation page is less empty!
(Add a checkmark in the center or somethin)
- Check the case when account already exists (email exists)
*/
}

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../config/Context";
import { ACCOUNT_CREATED, BACK, CONFIRM_PASSWORD, CREATE_ACCOUNT, EMAIL, GO_TO_HOME, NAME, PASSWORD, PASSWORD_ERROR_MSG } from "../utils/constants";
import { isEmailValid, isPasswordValid } from "../utils/helper";

type Props = {
  onClickBack: () => void;
};

const CreateAccountCard = ({ onClickBack }: Props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [createAccountError, setCreateAccountError] = useState<Error | null>(null);
  const [createdAccount, setCreatedAccount] = useState(false);
  const { setUserName } = useContext(UserContext);

  const auth = getAuth();
  const navigate = useNavigate();

  const handleEmailEntered = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(false); // this is to reset the error borders when someone starts typing a new value
  };

  const handleNameEntered = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameError(false);
  };

  const handlePasswordEntered = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
    setPasswordError(false);
  };

  const handleConfirmPasswordEntered = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPass(event.target.value);
    setConfirmPasswordError(false);
  };

  const handleCreateAccountClicked = async () => {
    setCreateAccountError(null);

    // do field checking
    const passedCheck = checkEmailPasswordFields();
    if (!passedCheck) {
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Update the user's profile with their name
        return updateProfile(user, {
          displayName: name,
        });
      })
      .then(() => {
        console.log("Account Created! Welcome!");
        setUserName(name);
        setCreatedAccount(true);
      })
      .catch((error) => {
        setCreateAccountError(error);
      });
  };

  const checkEmailPasswordFields = () => {
    const emailTest = isEmailValid(email);
    const passwordTest = isPasswordValid(password);
    if (email === "" && name === "" && password === "" && confirmPass === "") {
      setEmailError(true);
      setNameError(true);
      setConfirmPasswordError(true);
      setPasswordError(true);
      return false;
    }

    if (name === "") {
      setNameError(true);
      return false;
    }

    if (!passwordTest) {
      setPasswordError(true);
      return false;
    }

    if (password !== confirmPass) {
      setConfirmPasswordError(true);
      setPasswordError(true);
      return false;
    }

    if (!emailTest) {
      setEmailError(true);
      return false;
    }

    return true;
  };

  const goToHomePage = () => {
    navigate("/");
  };

  return createdAccount ? (
    <Card py={8} px={20} alignItems="center" borderRadius="xl" boxShadow="xl">
      <CardHeader>
        <VStack spacing={6}>
          <Heading size="lg" color="dark">
            {ACCOUNT_CREATED}
          </Heading>
          <Heading size="md" color="primary">
            Welcome {name}!
          </Heading>
        </VStack>
      </CardHeader>
      <CardBody>
        <Button
          size="lg"
          variant="primary"
          fontSize="lg"
          onClick={goToHomePage}
        >
          {GO_TO_HOME}
        </Button>
      </CardBody>
    </Card>
  ) : (
    <Card py={8} px={20} alignItems="center" borderRadius="xl" boxShadow="xl">
      <CardHeader>
        <Heading size="lg" color="brand.300">
           {CREATE_ACCOUNT}
        </Heading>
      </CardHeader>

      <CardBody>
        <Stack spacing="6" alignItems="center">
          <Box width="100%">
            <Text fontSize="md" as="b" color="brand.300">
              {EMAIL}
            </Text>
            <Input
              isInvalid={emailError}
              value={email}
              onChange={handleEmailEntered}
              errorBorderColor="crimson"
            />
          </Box>
          <Box width="100%">
            <Text fontSize="md" as="b" color="brand.300">
              {NAME}
            </Text>
            <Input
              isInvalid={nameError}
              value={name}
              onChange={handleNameEntered}
              errorBorderColor="crimson"
            />
          </Box>
          <Box width="100%">
            <Text fontSize="md" as="b" color="brand.300">
              {PASSWORD}
            </Text>
            <Input
              isInvalid={passwordError}
              value={password}
              type="password"
              onChange={handlePasswordEntered}
              errorBorderColor="crimson"
            />
            {passwordError && (
              <Text color="crimson" pt={3}>
                {PASSWORD_ERROR_MSG}
              </Text>
            )}
          </Box>
          <Box width="100%">
            <Text fontSize="md" as="b" color="brand.300">
              {CONFIRM_PASSWORD}
            </Text>
            <Input
              isInvalid={confirmPasswordError}
              value={confirmPass}
              type="password"
              onChange={handleConfirmPasswordEntered}
              errorBorderColor="crimson"
            />
          </Box>
          {createAccountError && (
              <Text color="crimson" pt={3}>
                {createAccountError.message}
              </Text>
            )}
        </Stack>
      </CardBody>

      <CardFooter>
        <Stack spacing={6}>
          <Button
            size="lg"
            variant="primary"
            fontSize="lg"
            onClick={handleCreateAccountClicked}
          >
            {CREATE_ACCOUNT}
          </Button>
          <Button color="dark" size="md" variant="link" onClick={onClickBack}>
            {BACK}
          </Button>
        </Stack>
      </CardFooter>
    </Card>
  );
};

export default CreateAccountCard;
