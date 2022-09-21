import Card from "../components/Card";
import React from "react";
import axios from "axios";
import AppContext from "../context";

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const { onAddToFavorites, onAddToCart } = React.useContext(AppContext);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://63107c8936e6a2a04eef854c.mockapi.io/orders"
        );
        setOrders(data.reduce((perv, obj) => [...perv, ...obj.items], []));

        setIsLoading(false);
      } catch (error) {
        alert("Ошибка при запросе заказов");
        console.log(error(error));
      }
    })();
  }, []);
  return (
    <div className="content">
      <div className="contentHeader">
        <h1>Мои заказы</h1>
      </div>

      <div className="sneakers">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card key={index} loading={isLoading} {...item} />
        ))}
      </div>
    </div>
  );
}
export default Orders;
