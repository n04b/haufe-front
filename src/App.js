import "./App.scss";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  withRouter,
} from "react-router-dom";
import Login from "./pages/Login";
import Character from "./pages/Character";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import { AuthContext } from "./context";
import Header from "./components/Header";
import LoginButton from "./components/LoginButton";

const App = () => {
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [pageName, setPageName] = useState("");

  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      login(storedToken);
    }
  }, []);

  useEffect(() => {
    setPageName(window.location.pathname.split("/")[1] || "home");
  }, [location]);

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, token, login, logout }}>
      <div className="App">
        {pageName !== "login" && <LoginButton />}
        <Header compact={!["home", "page"].some((item) => item === pageName)} />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/page/:page" component={withRouter(Home)} />
          <Route path="/login" component={Login} />
          <Route path="/character/:id" component={Character} />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
