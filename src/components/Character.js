import "./Character.scss";
import { Link } from "react-router-dom";
import FavoriteToggle from "./FavoriteToggle";

const Character = ({ image, name, id, isFavorite, isEnabled }) => {
  return (
    <div className="Character">
      <Link to={`/character/${id}`}>
        <img className="photo" src={image} alt={name} />
        <h3 className="name">{name}</h3>
      </Link>
      <FavoriteToggle {...{ id, isFavorite, isEnabled }} />
    </div>
  );
};

export default Character;
