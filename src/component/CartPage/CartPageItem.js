import { useEffect, useState } from "react";
import {
  faCaretLeft,
  faCaretRight,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../store/cart";

const CartPage = (props) => {
  const [quantity, setQuantity] = useState(props.quantity);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.listCart);

  const decrementHandler = () => {
    const id = props.id;
    if (quantity === 1) return;
    dispatch(cartAction.UPDATE_CART({ id, quantity: quantity - 1 }));
    setQuantity(quantity - 1);
  };

  const incrementHandler = () => {
    const id = props.id;
    dispatch(cartAction.UPDATE_CART({ id, quantity: quantity + 1 }));
    setQuantity(quantity + 1);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="row justify-content-center text-center align-items-center w-100">
      <p className="col-2">
        <img src={props.img} className="w-100" />
      </p>
      <p className="col-2">{props.name}</p>
      <p className="col-2 text-secondary">
        {props.formatCurrency(props.price)}
      </p>
      <p className="col-2">
        <button className="btn p-1" onClick={decrementHandler}>
          <FontAwesomeIcon icon={faCaretLeft} />
        </button>
        <span className="text-secondary">{quantity}</span>
        <button className="btn p-1" onClick={incrementHandler}>
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </p>
      <p className="col-2 text-secondary">
        {props.formatCurrency(props.price * quantity)}
      </p>
      <p className="col-1 text-secondary">{props.count}</p>
      <button className="col-1 btn">
        <FontAwesomeIcon
          icon={faTrashCan}
          className="text-secondary"
          onClick={() => dispatch(cartAction.DELETE_CART(props.id))}
        />
      </button>
    </div>
  );
};

export default CartPage;
