import styles from "./Drawer.module.scss";

import Info from "../Info";
import { useCart } from "../../hooks/useCart";

import React from "react";
import axios from "axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://63107c8936e6a2a04eef854c.mockapi.io/orders",
        { items: cartItems }
      );
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://63107c8936e6a2a04eef854c.mockapi.io/cart/" + item.id
        );
        await delay(1000);
      }

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);
    } catch (error) {
      alert("Ошбика при создании заказа");
    }
    setIsLoading(false);
  };
  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2>
          Корзина
          <img
            width={32}
            height={32}
            className={styles.btnRemove}
            src="/img/btnRemove.svg"
            alt="Close"
            onClick={onClose}
          ></img>
        </h2>

        {items.length > 0 ? (
          <>
            <div className={styles.items}>
              {items.map((obj) => (
                <div key={obj.id} className={styles.cartItem}>
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className={styles.cartItemImg}
                  ></div>

                  <div className={styles.cartPrice}>
                    <p>{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    width={32}
                    height={32}
                    className={styles.btnRemove}
                    src="/img/btnRemove.svg"
                    alt="Remove"
                    onClick={() => onRemove(obj.id)}
                  ></img>
                </div>
              ))}
            </div>
            <div className={styles.cartTotalBlock}>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.round((totalPrice / 100) * 5)} руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className={styles.greenButton}
              >
                Оформить заказ<img src="/img/arrow.svg" alt=""></img>
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Заказ #${orderId} оформлен!`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"
            }
            image={isOrderComplete ? "/img/order.png" : "/img/emptyCart.png"}
          />
        )}
      </div>
    </div>
  );
}
export default Drawer;
