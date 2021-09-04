import "./LoginButton.scss";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const LoginButton = () => {
  const authContext = useContext(AuthContext);
  const { isLoggedIn, logout } = authContext;

  const logoutHandler = () => {
    logout();
  };

  return (
    <div className="LoginButton">
      {!isLoggedIn && (
        <Link to="/login">
          <FontAwesomeIcon icon={faSignInAlt} />
        </Link>
      )}
      {isLoggedIn && (
        <span onClick={logoutHandler}>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </span>
      )}
    </div>
  );
};

export default LoginButton;
