import React from "react";
import AuthDetails from "./components/auth/Profile";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import Loader from "./components/Loader";
import Nav from "./components/nav/Nav";
import Dashboard from "./components/dashboard/Dashboard";
import AuthenticatedRoutes from "./components/auth/AuthenticatedRoutes";
import { setHeaders } from "./utils/setHeader";
import { getUserData } from "./utils/getUserData";
import { clearHeaders } from "./utils/clearHeaders";

function App() {
  const [user, setUser] = useState({
    isAuthenticated: false,
    profile: {},
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (firebaseUser) => {
      let userData;
      if (firebaseUser && firebaseUser.accessToken) {
        setHeaders(firebaseUser.accessToken);
        userData = await getUserData();
      }
      if (firebaseUser && userData.id) {
        setUser({
          isAuthenticated: true,
          profile: userData,
        });
      } else {
        clearHeaders();
        setUser({
          isAuthenticated: false,
          profile: {},
        });
      }
      setIsLoading(false);
    });

    return () => {
      listen();
    };
  }, []);

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
