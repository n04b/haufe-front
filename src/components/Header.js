import "./Header.scss";
import { ReactComponent as Logo } from "../assets/logo.svg";
import classNames from "classnames";
import { Link } from "react-router-dom";

const Header = ({ compact }) => {
  const HeaderClass = classNames(["Header", compact ? "compact" : "full"]);
  return (
    <div className={HeaderClass}>
      {compact ? (
        <Link to="/">
          <Logo className="logo" />
        </Link>
      ) : (
        <Logo className="logo" />
      )}
    </div>
  );
};

export default Header;
