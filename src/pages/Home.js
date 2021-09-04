import "./Home.scss";
import { useContext, useEffect, useState } from "react";
import Character from "../components/Character";
import { AuthContext } from "../context";
import Blind from "../components/Blind";
import Paginator from "../components/Paginator";
import { useParams } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;

const Home = () => {
  const { page = 1 } = useParams();
  const authContext = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [data, setData] = useState([]);
  const [pagesInfo, setPagesInfo] = useState({});
  const [dataWithFavorites, setDataWithFavorites] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(authContext.token);
  }, [authContext]);

  useEffect(() => {
    fetch(`${API_URL}/characters/${page}`)
      .then((response) => response.json())
      .then(({ results, info }) => {
        setData(results);
        setPagesInfo(info);
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

  useEffect(() => {
    if (data.length > 0) {
      setDataWithFavorites(
        data.map(({ id, name, image }) => ({
          id,
          name,
          image,
          isFavorite: favorites.some((item) => item.character === id),
          isEnabled: !!token,
        }))
      );
    }
  }, [data, favorites]);

  const totalPages = pagesInfo?.pages;

  return (
    <div className="PageHome">
      <Blind hidden={isLoaded} />
      <div className="characters">
        {dataWithFavorites.map((props) => (
          <Character key={props.id} {...props} />
        ))}
      </div>
      <Paginator {...{ page, totalPages }} />
    </div>
  );
};

export default Home;
