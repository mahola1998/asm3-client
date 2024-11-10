import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const PopupItem = ({ id, close, name, price, short_desc, img1 }) => {
  return (
    <div className="row justify-content-center">
      <div className="bg-white p-3 py-5 position-relative m-5 col-lg-6">
        <button onClick={close} className="position-absolute top-0 end-0 btn">
          &times;
        </button>
        <div className="row fst-italic">
          <div className="col-6">
            <img src={img1} className="w-100" />
          </div>
          <div className="col-6">
            <h4>{name}</h4>
            <h6 className="text-secondary">{price}</h6>
            <p className="text-body-tertiary" style={{ fontSize: "0.8rem" }}>
              {short_desc}
            </p>
            <Link to={`detail/:${id}`} className="btn btn-dark rounded-0">
              <FontAwesomeIcon icon={faCartShopping} /> View Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupItem;
