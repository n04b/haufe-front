import "./Character.scss";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../context";
import FavoriteToggle from "../components/FavoriteToggle";
import Blind from "../components/Blind";
const API_URL = process.env.REACT_APP_API_URL;

const InfoLine = ({ label, text }) => (
  <div className="line">
    <span className="label">{label}:</span> {text}
  </div>
);

const Character = () => {
  const { id } = useParams();
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(
      favorites.some(({ character }) => character === parseInt(id))
    );
  }, [favorites]);

  const { token } = authContext;

  useEffect(() => {
    fetch(`${API_URL}/character/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          history.push("/404");
        }
        return response.json();
      })
      .then((response) => {
        setData(response);
        setIsLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (token) {
      fetch(`${API_URL}/favorites`, {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setFavorites(response);
        });
    }
  }, [token]);

  const { image, name, gender, status, species, origin, location } = data;

  return (
    <div className="PageCharacter">
      <Blind hidden={isLoaded} />
      <img className="photo" src={image} alt={name} />
      <div className="info">
        <div className="title-wrapper">
          <h2 className="title">{name}</h2>
          <FavoriteToggle {...{ id, isFavorite, isEnabled: !!token }} />
        </div>
        <InfoLine label="Gender" text={gender} />
        <InfoLine label="Status" text={status} />
        <InfoLine label="Species" text={species} />
        <InfoLine label="Origin" text={origin?.name} />
        <InfoLine label="Location" text={location?.name} />
      </div>
    </div>
  );
};

export default Character;
