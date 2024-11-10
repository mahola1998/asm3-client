import { useSelector } from "react-redux";
import CartPageItem from "../component/CartPage/CartPageItem";
import { useEffect, useState } from "react";
import {
  faGift,
  faLeftLong,
  faRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { formatCurrency } from "../js/formatcurrentcy";

const CartPage = () => {
  const [total, setTotal] = useState();
  const cartItems = useSelector((state) => state.cart.listCart);
  const [itemCount, setItemCount] = useState([]);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    let number = 0;
    for (let i = 0; i < cartItems.length; i++) {
      number += cartItems[i].product.price * cartItems[i].quantity;
    }
    setTotal(number);

    try {
      const getCountProduct = async () => {
        const response = await fetch(
          "https://asm3-sever-app.onrender.com/shop/getCount",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ items: cartItems }),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error fetching data:", errorData);
          return;
        }
        const data = await response.json();
        setItemCount(data);
      };

      getCountProduct();
    } catch (err) {
      console.error("Error in fetch:", err);
    }
  }, [cartItems]);

  useEffect(() => {
    cartItems.map((item) => {
      let count;
      for (let i = 0; i < itemCount.length; i++) {
        if (itemCount[i].item === item.id) {
          count = itemCount[i].count;
        }
      }
      if (count < item.quantity) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    });
  }, [cartItems]);

  return (
    <div className="row justify-content-center w-100 fst-italic m-auto mb-5">
      <div className="col-lg-7 p-0">
        <div className="mb-5" style={{ backgroundColor: "#f3f5f2" }}>
          <div className="d-flex justify-content-between align-items-center p-5 ">
            <h2 className="m-0">CART</h2>
            <p className="text-secondary m-0">CART</p>
          </div>
        </div>
        <div>
          <h3 className="py-4">SHOPPING CART</h3>
          <div className="d-flex justify-content-center">
            <div className="row w-100">
              <div className="col-9 p-0">
                <div>
                  {!disable && (
                    <div class="alert alert-danger ms-0 me-3" role="alert">
                      Insufficient product quantity
                    </div>
                  )}
                  <div
                    className="row justify-content-between text-center p-3 w-100"
                    style={{ backgroundColor: "#f3f5f2" }}
                  >
                    <p className="col-2 m-0">IMAGE</p>
                    <p className="col-2 m-0">PRODUCT</p>
                    <p className="col-2 m-0">PRICE</p>
                    <p className="col-2 m-0">QUANTITY</p>
                    <p className="col-2 m-0">TOTAL</p>
                    <p className="col-1 m-0">COUNT</p>
                    <p className="col-1 m-0">REMOVE</p>
                  </div>
                  <div>
                    {cartItems.map((item) => {
                      let count;
                      for (let i = 0; i < itemCount.length; i++) {
                        if (itemCount[i].item === item.id) {
                          count = itemCount[i].count;
                        }
                      }
                      return (
                        <CartPageItem
                          key={item.id}
                          id={item.id}
                          img={item.product.img1}
                          name={item.product.name}
                          price={item.product.price}
                          quantity={item.quantity}
                          count={count}
                          formatCurrency={formatCurrency}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="m-2">
                  <div className="mb-5" style={{ backgroundColor: "#f3f5f2" }}>
                    <div className="d-flex justify-content-between p-3">
                      <Link to="/shop" className="btn text-secondary">
                        <FontAwesomeIcon icon={faLeftLong} />
                        &nbsp; Continue shopping
                      </Link>
                      <button className="btn" disabled={!disable}>
                        <Link
                          to="/checkout"
                          className="btn btn-outline-secondary rounded-0"
                        >
                          Proceed to checkout &nbsp;
                          <FontAwesomeIcon icon={faRightLong} />
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3 p-0">
                <div
                  className=" py-4 px-2"
                  style={{ backgroundColor: "#f3f5f2" }}
                >
                  <div className="p-2 py-2">
                    <h5 className="mb-4">CART TOTAL</h5>
                    <div className="d-flex justify-content-between border-bottom border-secondary-subtle py-3">
                      <p className="m-0">SUBTOTAL</p>
                      <p className="m-0 text-secondary">
                        {formatCurrency(total)}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between py-3 align-items-center">
                      <p>TOTAL</p>
                      <p className="fs-6">{formatCurrency(total)}</p>
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Enter your coupon"
                      className="d-block border border-secondary p-2 w-100"
                    />
                    <button className="btn btn-dark rounded-0 w-100">
                      <FontAwesomeIcon icon={faGift} />
                      &nbsp; Apply coupon
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
