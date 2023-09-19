import AuthDetails from './components/auth/AuthDetails';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Signin />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/' element={<AuthDetails />}/>
      </Routes>
    </Router>
  );
}

export default App;
