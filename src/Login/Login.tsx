import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Center } from "@chakra-ui/react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import LoginCard from "./LoginCard";
import CreateAccountCard from "./CreateAccountCard";

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const auth = getAuth();
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleCards = () => {
    setShowLogin(!showLogin);
  };

  const handleCreateAccountClicked = () => {
    toggleCards();
  };

  const handleForgotPasswordClicked = () => {
    navigate("/forgotPassword");
  };

  return (
    <Center height="100vh" width="100vw" bg="highlight">
      <Box position="relative" w="600px" h="800px" overflow="hidden">
        <Box
          position="absolute"
          top="0"
          left={showLogin ? "0" : "-100%"}
          color="white"
          p="4"
          transition="left 0.3s ease-in-out"
        >
          <LoginCard
            onClickGoogleSignIn={signInWithGoogle}
            onClickForgotPass={handleForgotPasswordClicked}
            onClickCreate={handleCreateAccountClicked}
          />
        </Box>

        <Box
          position="absolute"
          top="0"
          left={showLogin ? "100%" : "0"}
          color="white"
          p="4"
          transition="left 0.3s ease-in-out"
        >
          <CreateAccountCard onClickBack={toggleCards} />
        </Box>
      </Box>
    </Center>
  );
};

export default Login;
