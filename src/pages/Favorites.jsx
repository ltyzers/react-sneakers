import Card from "../components/Card";
import React from "react";
import AppContext from "../context";

function Favorites({}) {
  const { favorites, onAddToFavorites } = React.useContext(AppContext);
  return (
    <div className="content">
      <div className="contentHeader">
        <h1>Мои закладки</h1>
      </div>

      <div className="sneakers">
        {favorites.map((item, index) => (
          <Card
            key={index}
            favorited={true}
            onFavorite={onAddToFavorites}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}
export default Favorites;
