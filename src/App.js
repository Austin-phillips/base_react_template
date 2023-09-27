import React, { useEffect } from "react";
import AuthDetails from "./components/auth/Profile";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { useState } from "react";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import Loader from "./components/Loader";
import Nav from "./components/nav/Nav";
import Dashboard from "./components/dashboard/Dashboard";
import AuthenticatedRoutes from "./components/auth/AuthenticatedRoutes";
import { apiClient } from "./axios/apiClient";
import { accessToken } from "./utils/getAccessToken";
import { getUserData } from "./utils/getUserData";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      if (accessToken) {
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        try {
          const data = await getUserData();
          setUser(data);
        } catch (err) {
          setUser({});
        }
        setIsLoading(false);
        return;
      } else {
        delete apiClient.defaults.headers.common["Authorization"];
        setUser({});
        setIsLoading(false);
        return;
      }
    };

    return () => {
      fetchUser();
    };
  }, [accessToken]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Nav>
          <Routes>
            <Route element={<AuthenticatedRoutes />}>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Signin />} />
            </Route>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<AuthDetails />} />
            </Route>
          </Routes>
        </Nav>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
