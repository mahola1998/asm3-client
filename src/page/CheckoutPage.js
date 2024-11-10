import { Form, Link, useLoaderData, useNavigate } from "react-router-dom";
import BillCheckout from "../component/CheckoutPage/BillCheckout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const userData = useLoaderData();
  const [total, setTotal] = useState();
  const cartItems = useSelector((state) => state.cart.listCart);
  useEffect(() => {
    if (!userData.loggedIn) {
      navigate("/login");
    }
  }, []);

  const submitOrder = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const billingData = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
    };

    console.log(cartItems);
    try {
      const response = await fetch(
        "https://asm3-sever-app.onrender.com/shop/order",
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            cartItems: cartItems,
            total: total,
            data: billingData,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        console.error("Failed to place order");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error placing order", error);
    }
  };

  return (
    <div className="row justify-content-center w-100 fst-italic m-auto mb-5">
      <div className="col-lg-7 p-0">
        <div className="mb-5" style={{ backgroundColor: "#f3f5f2" }}>
          <div className="d-flex justify-content-between align-items-center p-5 ">
            <h2 className="m-0">CHECKOUT</h2>
            <div className="d-flex">
              <Link to="/" className="m-0 p-0 btn">
                HOME&nbsp;/&nbsp;
              </Link>
              <Link to="/cart" className="m-0 p-0 btn">
                CART&nbsp;/&nbsp;
              </Link>
              <Link className="m-0 p-0 btn text-secondary">CHECKOUT</Link>
            </div>
          </div>
        </div>
        <div>
          <h3 className="p-2">BILLING DETAILS</h3>
          <div className="row w-100 p-2">
            {/* checkout form */}
            <Form onSubmit={submitOrder} className="text-secondary col-7">
              <label className="my-2">FULL NAME:</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter Your Full Name Here!"
                className="w-100 p-2"
              />
              <label className="my-2">EMAIL:</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email Here!"
                className="w-100 p-2"
              />
              <label className="my-2">PHONE NUMBER:</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter Your Phone Number Here!"
                className="w-100 p-2"
              />
              <label className="my-2">ADDRESS:</label>
              <input
                type="text"
                name="address"
                placeholder="Enter Your Address Here!"
                className="w-100 p-2"
              />
              <button
                type="submit"
                className="btn btn-dark rounded-0 fst-italic my-3"
              >
                Place order
              </button>
            </Form>
            {/* checkout bill */}
            <div className="col-5 p-0">
              <BillCheckout
                total={total}
                setTotal={setTotal}
                cartItems={cartItems}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
