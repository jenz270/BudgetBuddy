import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Expenses from "./Expenses/Expenses";
import Home from "./Home/Home";
import ForgotPassword from "./Login/ForgotPassword";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
import AuthRoute from "./config/AuthRoute";
import { UserContext } from "./config/Context";

function App() {
  const [userId, setUserId] = React.useState<string>("");
  const [userName, setUserName] = React.useState<string>("");
  const [userEmail, setUserEmail] = React.useState<string>("");

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
      }}
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route
          path="/"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="profile" element={<Profile />} />
          {/* Add more routes here */}
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
