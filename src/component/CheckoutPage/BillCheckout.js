import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../js/formatcurrentcy";

const BillCheckout = ({ setTotal, total, cartItems }) => {
  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < cartItems.length; i++) {
      sum += cartItems[i].product.price * cartItems[i].quantity;
    }
    setTotal(sum);
  }, [cartItems]);

  return (
    <div className="py-4 px-4" style={{ backgroundColor: "#f3f5f2" }}>
      <div className="my-4">
        <h3>YOUR ORDER</h3>
        <div className="p-2">
          <ul className="p-0" style={{ listStyleType: "none" }}>
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="row justify-content-between border-bottom pt-3"
              >
                <p className="col-7">{item.product.name}</p>
                <p className="col-5 text-end text-secondary">
                  {formatCurrency(item.product.price)} x {item.quantity}
                </p>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between fs-5">
            <div>TOTAL</div>
            <div>{formatCurrency(total)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BillCheckout;
