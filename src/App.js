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

function App() {
  const [user, setUser] = useState({
    isAuthenticated: false,
    email: null,
    idToken: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken();
        setUser({
          isAuthenticated: true,
          email: firebaseUser.email,
          idToken,
        });
      } else {
        setUser({
          isAuthenticated: false,
          email: null,
          idToken: null,
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
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Signin />} />
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
