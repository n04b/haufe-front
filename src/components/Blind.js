import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useEffect, useState } from "react";
import "./Blind.scss";

const Blind = ({ hidden }) => {
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRemoved(true);
    }, 1200);
  }, []);

  const BlindClass = classNames({
    Blind: true,
    hidden,
    removed,
  });

  return (
    <div className={BlindClass}>
      <FontAwesomeIcon className="spinner" icon={faCircleNotch} spin />
    </div>
  );
};

export default Blind;
