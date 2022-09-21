import styles from "./Card.module.scss";
import React from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";

function Card({
  id,
  parentId,
  title,
  imageUrl,
  price,
  onFavorite,
  addToCart,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setAsFavorite] = React.useState(favorited);
  const obj = { id, parentId: id, title, imageUrl, price };

  const onClickAdd = () => {
    addToCart(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setAsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={160}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img
                width={32}
                height={32}
                src={
                  isFavorite
                    ? "/img/favoriteActive.svg"
                    : "/img/favoriteInactive.svg"
                }
                alt="Add favorite"
              ></img>
            </div>
          )}
          <img wdith="100%" height={135} src={imageUrl} alt="Sneaker" />
          <h5>{title}</h5>
          <div className={styles.cardBottom}>
            <div className={styles.price}>
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {addToCart && (
              <img
                width={32}
                height={32}
                src={
                  isItemAdded(id) ? "/img/ordered.svg" : "/img/addProduct.svg"
                }
                alt="Add to cart"
                onClick={onClickAdd}
              ></img>
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default Card;
