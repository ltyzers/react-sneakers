import Card from "../components/Card";
import React from "react";

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorites,
  onAddToCart,
  isLoading,
}) {
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(12)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddToFavorites(obj)}
        addToCart={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };
  return (
    <div className="content">
      <div className="contentHeader">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="searchBlock">
          <img src="img/search.svg" alt="Search"></img>
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              width={32}
              height={32}
              className="clear"
              src="img/btnRemove.svg"
              alt="Clear"
            ></img>
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск..."
          ></input>
        </div>
      </div>

      <div className="sneakers">{renderItems()}</div>
    </div>
  );
}
export default Home;
