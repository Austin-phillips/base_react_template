import React, { useEffect } from "react";
import AuthDetails from "./components/Profile/Profile";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { useState } from "react";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import Loader from "./components/Loader";
import Dashboard from "./components/dashboard/Dashboard";
import AuthenticatedRoutes from "./components/auth/AuthenticatedRoutes";
import { apiClient } from "./axios/apiClient";
import { getUserData } from "./utils/getUserData";
import { useAccessToken } from "./hooks/useAccessToken";
import { ForgotPassword } from "./components/auth/ForgotPassword";
import { ResetPassword } from "./components/auth/ResetPassord";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [accessToken] = useAccessToken();

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
    <div>
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <Routes>
            <Route element={<AuthenticatedRoutes />}>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Signin />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/forgot-password/code" element={<ResetPassword />} />
            </Route>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<AuthDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
