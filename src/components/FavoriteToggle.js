import "./FavoriteToggle.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context";
const API_URL = process.env.REACT_APP_API_URL;

const FavoriteToggle = ({ id, isFavorite, isEnabled }) => {
  const authContext = useContext(AuthContext);
  const [favorite, setFavorite] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { token } = authContext;

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const handleRequest = () => {
    if (disabled) {
      return;
    }

    setDisabled(true);
    setFavorite(!favorite);

    fetch(`${API_URL}/favorites`, {
      method: "POST",
      headers: {
        "x-access-token": token,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id,
        selected: !favorite,
      }),
    }).then((response) => {
      if (response.status !== 204) {
        setFavorite(!favorite);
      }
      setDisabled(false);
    });
  };

  const favoriteToggleClass = classNames({
    FavoriteToggle: true,
    isFavorite: favorite,
    isEnabled,
  });

  return (
    <FontAwesomeIcon
      onClick={handleRequest}
      className={favoriteToggleClass}
      icon={favorite ? faHeart : farHeart}
    />
  );
};

export default FavoriteToggle;
