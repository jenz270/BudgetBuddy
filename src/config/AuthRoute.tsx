import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../config/Context";

type Props = {
  children: React.ReactNode;
};

const AuthRoute = ({ children }: Props) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>();
  const { setUserId } = useContext(UserContext);
  const { setUserName } = useContext(UserContext);
  const { setUserEmail } = useContext(UserContext);

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("authorized");
        setCurrentUser(user);
        setUserId(user.uid);
        setUserName(user.displayName || "");
        setUserEmail(user.email || "");
        setLoading(false);
      } else {
        console.log("unauthorized");
        navigate("login");
      }
    });

    return () => AuthCheck();
  }, [auth, navigate, setUserEmail, setUserId, setUserName]);

  if (loading) return <p>loading...</p>;

  return React.cloneElement(children as React.ReactElement, {
    user: currentUser,
  });
};

export default AuthRoute;
