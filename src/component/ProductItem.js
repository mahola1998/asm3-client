import styles from "./homePage/Category.module.css";
import Popup from "reactjs-popup";
import PopupItem from "./homePage/PopupItem";
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../js/formatcurrentcy";

const ProductItem = (props) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [page] = useState(props.page);

  const openPopuphandler = () => {
    setPopupOpen(true);
  };

  const closePopupHandler = () => {
    setPopupOpen(false);
  };

  return (
    <li className={`${page === "shopPage" ? "col-4" : "col-3"}`}>
      {page === undefined && (
        <div>
          <Popup
            modal
            open={popupOpen}
            onClose={closePopupHandler}
            overlayStyle={{ backgroundColor: "rgba(0,0,0,0.2)" }}
          >
            {(close) => (
              <PopupItem
                id={props.id}
                name={props.name}
                img1={props.img1}
                price={formatCurrency(props.price)}
                short_desc={props.short_desc}
                close={closePopupHandler}
              />
            )}
          </Popup>
          <div className={styles["category-link"]} onClick={openPopuphandler}>
            <img src={props.img1} className="w-100" />
          </div>
        </div>
      )}
      {page === "shopPage" && (
        <Link to={`/detail/:${props.id}`}>
          <div className={styles["category-link"]}>
            <img src={props.img1} className="w-100" />
          </div>
        </Link>
      )}
      <p className="text-center my-1">{props.name}</p>
      <p className="text-center text-secondary">
        {formatCurrency(props.price)}
      </p>
    </li>
  );
};

export default ProductItem;
