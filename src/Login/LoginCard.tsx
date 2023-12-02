import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../config/Context";
import {
  CREATE_AN_ACCOUNT,
  EMAIL,
  ENTER_EMAIL,
  ENTER_PASSWORD,
  FORGOT_PASSWORD,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_PAGE,
  PASSWORD,
} from "../utils/constants";
import { isEmailValid } from "../utils/helper";
import GoogleSignInButton from "./GoogleSignInButton";

type Props = {
  onClickGoogleSignIn: () => void;
  onClickForgotPass: () => void;
  onClickCreate: () => void;
};

const LoginCard = ({
  onClickGoogleSignIn,
  onClickForgotPass,
  onClickCreate,
}: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasErrors, setHasErrors] = useState(false);
  const { setUserId } = useContext(UserContext);

  const auth = getAuth();
  const navigate = useNavigate();

  const signInWithEAndP = async () => {
    if (!isEmailValid) {
      setHasErrors(true);
      return;
    }

    if (password === "") {
      setHasErrors(true);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setUserId(response.user.uid);
        setHasErrors(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setHasErrors(true);
      });
  };

  const handlePasswordEntered = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
    setHasErrors(false);
  };

  const handleEmailEntered = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setHasErrors(false);
  };

  return (
    <Card py={8} px={20} alignItems="center" borderRadius="xl" boxShadow="xl">
      <CardHeader>
        <Heading size="lg" color="brand.300">
          {LOGIN_PAGE}
        </Heading>
      </CardHeader>

      <CardBody>
        <Stack spacing="6" alignItems="center">
          <GoogleSignInButton onClick={onClickGoogleSignIn} />
          <Divider />
          <Box width="100%">
            <Text fontSize="lg" as="b" color="brand.300">
              {EMAIL}
            </Text>
            <Input
              id="email"
              name="email"
              type="email"
              isInvalid={hasErrors}
              value={email}
              onChange={handleEmailEntered}
              errorBorderColor="crimson"
              placeholder={ENTER_EMAIL}
              autoComplete="email"
            />
          </Box>
          <Box width="100%">
            <Text fontSize="lg" as="b" color="brand.300">
              {PASSWORD}
            </Text>
            <Input
              id="password"
              name="password"
              isInvalid={hasErrors}
              value={password}
              type="password"
              onChange={handlePasswordEntered}
              errorBorderColor="crimson"
              placeholder={ENTER_PASSWORD}
              autoComplete="password"
            />
          </Box>
          {hasErrors && (
            <Box>
              <Text color="primary">{LOGIN_ERROR}</Text>
            </Box>
          )}
          <Box width="100%" textAlign="left">
            <Button
              color="secondary"
              size="xs"
              variant="link"
              onClick={onClickForgotPass}
            >
              {FORGOT_PASSWORD}
            </Button>
          </Box>
        </Stack>
      </CardBody>

      <CardFooter>
        <HStack>
            <Button
              type="submit"
              size="lg"
              variant="primary"
              fontSize="lg"
              fontFamily="heading"
              onClick={signInWithEAndP}
            >
              {LOGIN}
            </Button>
          <Text>Or</Text>
          <Button
            color="secondary"
            size="lg"
            variant="link"
            onClick={onClickCreate}
          >
            {CREATE_AN_ACCOUNT}
          </Button>
        </HStack>
      </CardFooter>
    </Card>
  );
};

export default LoginCard;
