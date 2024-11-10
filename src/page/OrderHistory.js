import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await fetch(
          "https://asm3-sever-app.onrender.com/shop/order",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch order history");
        }

        const data = await response.json();
        setOrders(data.order);
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    getOrder();
  }, []);

  return (
    <div className="row justify-content-center w-100 fst-italic m-auto mb-5">
      <div className="col-lg-7 p-0">
        <div className="mb-5" style={{ backgroundColor: "#f3f5f2" }}>
          <div className="d-flex justify-content-between align-items-center p-5 ">
            <h2 className="m-0">HISTORY</h2>
            <div className="d-flex">
              <Link className="m-0 p-0 btn text-secondary">HISTORY</Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className="row justify-content-between text-center p-3 w-100"
          style={{ backgroundColor: "#f3f5f2" }}
        >
          <p className="col-2 m-0">ID ORDER</p>
          <p className="col-2 m-0">ID USER</p>
          <p className="col-1 m-0">NAME</p>
          <p className="col-1 m-0">PHONE</p>
          <p className="col-1 m-0">ADDRESS</p>
          <p className="col-1 m-0">TOTAL</p>
          <p className="col-1 m-0">DELIVERY</p>
          <p className="col-1 m-0">STATUS</p>
          <p className="col-1 m-0">DETAIL</p>
        </div>
        <div>
          {orders.length > 0 &&
            orders.map((el) => {
              let status;
              if (el.status === "processing") {
                status = "Waiting for pay";
              } else {
                status = "done";
              }
              return (
                <div
                  key={el._id}
                  className="row justify-content-between text-center align-items-center w-100"
                >
                  <p className="col-2 text-secondary">{el._id}</p>
                  <p className="col-2 text-secondary">{el.user.user}</p>
                  <p className="col-1 text-secondary">{user.name}</p>
                  <p className="col-1 text-secondary">{user.phone}</p>
                  <p className="col-1 text-secondary">{el.user.address}</p>
                  <p className="col-1 text-secondary">
                    {el.total.toLocaleString("de-DE")} VND
                  </p>
                  <p className="col-1 text-secondary">
                    Waiting for {el.status}
                  </p>
                  <p className="col-1 text-secondary">{status}</p>
                  <Link to={`/order/${el._id}`} className="col-1  btn border">
                    View &nbsp; <FontAwesomeIcon icon={faRightLong} />
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
