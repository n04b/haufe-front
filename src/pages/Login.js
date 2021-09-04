import "./Login.scss";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context";
import ErrorMessage from "../components/ErrorMessage";
const API_URL = process.env.REACT_APP_API_URL;

const setValue = (set) => (event) => set(event.target.value);

const Login = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { isLoggedIn, login } = authContext;

  if (isLoggedIn) {
    history.push("/");
  }

  const handleLogin = (event) => {
    event.preventDefault();

    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, password }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.message) {
          setErrorMessage(response.message);
        }
        if (response.accessToken) {
          login(response.accessToken);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="PageLogin">
      <input value={user} onChange={setValue(setUser)} placeholder="user" />
      <input
        value={password}
        onChange={setValue(setPassword)}
        type="password"
        placeholder="password"
      />

      <button className="submit-button" onClick={handleLogin}>
        Login
      </button>

      <ErrorMessage {...{ errorMessage: errorMessage }} />
    </div>
  );
};

export default Login;
