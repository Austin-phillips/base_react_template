import AuthDetails from './components/auth/AuthDetails';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import ProtectedRoutes from './components/auth/ProtectedRoutes';
import Loader from './components/Loader';

function App() {
  const [user, setUser] = useState({
    isAuthenticated: false,
    email: null,
    idToken: null
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
            const idToken = await firebaseUser.getIdToken();
            setUser({
              isAuthenticated: true,
              email: firebaseUser.email,
              idToken
            })
        } else {
          setUser({
            isAuthenticated: false,
            email: null,
            idToken: null
          })
        }
        setIsLoading(false)
    });

    return () => {
        listen();
    }

}, []);

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <UserContext.Provider value={user}>
      <Router>
        <Routes>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/login' element={<Signin />}/>
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<AuthDetails />}/>
          </Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
