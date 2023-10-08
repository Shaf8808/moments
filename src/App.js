import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create context function
export const CurrentUserContext = createContext();
// Evertime the setcurrent user function is called, a new context object is created
export const SetCurentUserContext = createContext();

function App() {
  const [currentUser, setCurentUser] = useState(null);

  const handleMount = async () => {
    try {
      const { data } = await axios.get("dj-rest-auth/user/");
      // Callback function
      setCurentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
    // Pass it an empty array to only run function once
  }, []);

  return (
    // Provider for variable currentUser
    <CurrentUserContext.Provider value={currentUser}>
      {/* Provider for callback function setCurentUser */}
      <SetCurentUserContext.Provider value={setCurentUser}>
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <h1>Home page</h1>} />
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route render={() => <h1>Page not found!</h1>} />
            </Switch>
          </Container>
        </div>
      </SetCurentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
