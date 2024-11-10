import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const OrderDetail = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState("");
  const [total, setTotal] = useState(0);
  const params = useParams();

  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await fetch(
          `https://asm3-sever-app.onrender.com/shop/order/${params.orderId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch order history");
        }

        const data = await response.json();

        setProducts(data.products);
        setUser(data.user);
        setTotal(data.total);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    getOrder();
  }, [params.orderId]);

  return (
    <div className="row justify-content-center w-100 fst-italic m-auto mt-5 mb-5">
      <div className="col-lg-7 p-0">
        <div className="mb-5" style={{ backgroundColor: "#f3f5f2" }}>
          <div className="d-flex justify-content-between align-items-center p-5 ">
            <h2 className="m-0">Order Detail</h2>
            <div className="d-flex">
              <Link className="m-0 p-0 btn text-secondary">Order Detail</Link>
            </div>
          </div>
        </div>
        <div>
          <h1>INFORMATION ORDER</h1>
          <p className="text-secondary m-0">ID User: {user && user.user._id}</p>
          <p className="text-secondary m-0">
            Full Name: {user && user.user.fullname}
          </p>
          <p className="text-secondary m-0">Phone: {user && user.user.phone}</p>
          <p className="text-secondary m-0">Address: {user && user.address}</p>
          <p className="text-secondary m-0">
            Total: {total.toLocaleString("de-DE")} VND
          </p>
        </div>
        <div className="my-5">
          <div
            className="row justify-content-between text-center p-3 w-100"
            style={{ backgroundColor: "#f3f5f2" }}
          >
            <p className="col-2 m-0">ID PRODUCT</p>
            <p className="col-2 m-0">IMAGE</p>
            <p className="col-2 m-0">NAME</p>
            <p className="col-2 m-0">PRICE</p>
            <p className="col-1 m-0">COUNT</p>
          </div>
          <div>
            {products.length > 0 &&
              products.map((el) => {
                return (
                  <div
                    key={el.product._id}
                    className="row justify-content-between text-center align-items-center w-100"
                  >
                    <p className="col-2 text-secondary">{el.product._id}</p>
                    <img src={el.product.img1} className="col-2" />
                    <p className="col-2 text-secondary">{el.product.name}</p>
                    <p className="col-2 text-secondary">
                      {el.product.price.toLocaleString("de-DE")} VND
                    </p>
                    <p className="col-1 text-secondary">{el.quantity}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
