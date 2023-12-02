import { Box, Button, Input, Text } from "@chakra-ui/react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACK_TO_LOGIN, ENTER_EMAIL, FORGOT_PASSWORD, PASSWORD_RESET, SEND } from "../utils/constants";

const ForgotPassword = () => {
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const auth = getAuth();
  const navigate = useNavigate();

  const triggerResetEmail = async () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEmailEntered = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleBackToLoginClick = () => {
    navigate("/");
  };

  return (
    <>
      {success ? (
        <Box>
          <Text>{PASSWORD_RESET}</Text>
          <Button onClick={handleBackToLoginClick}>{BACK_TO_LOGIN}</Button>
        </Box>
      ) : (
        <Box>
          <Text>{FORGOT_PASSWORD}</Text>
          <Input placeholder={ENTER_EMAIL} onChange={handleEmailEntered} />
          <Button onClick={triggerResetEmail}>{SEND}</Button>
        </Box>
      )}
    </>
  );
};

export default ForgotPassword;
