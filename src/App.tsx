import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from 'src/views/Signup';
import Homepage from 'src/views/Homepage';
import AuthContext from 'src/contexts/AuthContext';
import { useState } from 'react';
import UserInterface from 'src/interfaces/UserInterface';
import { useEffect } from 'react';

import getLoggedInUser from './queries/getLoggedInUser';
import PrivateRoute from './components/PrivateRoute';
import Login from './views/Login';
import { ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [loadingUser, setLoadingUser] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState<null | UserInterface>(null);

  useEffect(() => {
    const initUser = async () => {
      const user = await getLoggedInUser();

      if (!user) return setLoadingUser(false);

      setLoggedInUser(user);
    };

    initUser();
  }, []);

  return (
    <Router>
      <ToastContainer />
      <div className="app-container">
        <Switch>
          <AuthContext.Provider
            value={{
              user: loggedInUser,
              loadingUser,
              setUser: setLoggedInUser,
            }}
          >
            <PrivateRoute path="/" exact>
              <Homepage />
            </PrivateRoute>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </AuthContext.Provider>
        </Switch>
      </div>
    </Router>
  );
}
