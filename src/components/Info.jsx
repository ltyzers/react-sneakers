import React from "react";
import AppContext from "../context";
import styles from "./Drawer/Drawer.module.scss";

export const Info = ({ title, image, description }) => {
  const { setCartOpened } = React.useContext(AppContext);
  return (
    <div className={styles.cartEmpty}>
      <img width={120} src={image} alt="Empty cart" />
      <h2>{title}</h2>
      <p>{description}</p>
      <button
        className={styles.greenButton}
        onClick={() => setCartOpened(false)}
      >
        <img src="/img/arrow.svg" alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
