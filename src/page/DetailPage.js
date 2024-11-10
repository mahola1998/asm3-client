import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductItem from "../component/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../store/cart";
import { formatCurrency } from "../js/formatcurrentcy";

const DetailPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.listCart);
  const products = useLoaderData();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [productList, setProductList] = useState();
  const [formattedText, setFormattedText] = useState();
  const [pictureDetail, setPictureDetail] = useState();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(
        `https://asm3-sever-app.onrender.com/shop/product/${params.productId.substring(
          1
        )}`
      );
      if (!response.ok) {
        console.log("Products not found!");
      }
      const data = await response.json();
      console.log(data);
      setProduct(data.product);
      setProductList(data.productList);
    };
    getProduct();
  }, [params.productId]);

  //

  useEffect(() => {
    setFormattedText(
      product.long_desc ? product.long_desc.replace(/\n/g, "<br />") : ""
    );
    setPictureDetail(product.img4);
  }, [product]);

  const onClickPictureHandler = (event) => {
    setPictureDetail(event.target.src);
  };

  //Add to Cart
  const handleAddToCart = () => {
    const id = product._id;
    const existingItem = cartItems.find((item) => item.id === id);
    if (existingItem) {
      dispatch(
        cartAction.UPDATE_CART({
          id,
          quantity: existingItem.quantity + quantity,
        })
      );
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      dispatch(
        cartAction.ADD_CART({
          id,
          product,
          quantity,
        })
      );
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  };
  //decrement quantity
  const decrementQuantityHandler = () => {
    if (quantity === 1) {
      return;
    } else {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="row w-100 my-5 justify-content-center">
      <div className="col-lg-7">
        <div className="row mb-5 align-items-center p-3">
          {/* Picture in left */}
          <div className="row align-items-center col-6">
            <div className="col-3 p-0 ps-2">
              <img
                src={product.img1}
                onClick={onClickPictureHandler}
                className="w-100 p-1"
              ></img>
              <img
                src={product.img2}
                onClick={onClickPictureHandler}
                className="w-100 p-1"
              ></img>
              <img
                src={product.img3}
                onClick={onClickPictureHandler}
                className="w-100 p-1"
              ></img>
              <img
                src={product.img4}
                onClick={onClickPictureHandler}
                className="w-100 p-1"
              ></img>
            </div>
            <div className="col-9 p-0 ">
              <img src={pictureDetail} className="w-100 p-1"></img>
            </div>
          </div>
          {/* Info in right */}
          <div className="col-6">
            <div>
              <h3 className="fst-italic">{product.name}</h3>
              <h6 className="text-secondary fst-italic">
                {formatCurrency(product.price)}
              </h6>
              <p className="text-secondary fst-italic">{product.short_desc}</p>
              <p className="fst-italic">
                CATEGORY:{"     "}
                <span className="text-secondary">{product.category}</span>
              </p>
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center border border-secondary gap-3">
                  <div className="text-secondary px-3 fst-italic">QUANTITY</div>
                  <div className="px-3">
                    <button
                      className="btn p-1"
                      onClick={decrementQuantityHandler}
                    >
                      <FontAwesomeIcon icon={faCaretLeft} />
                    </button>
                    <span>{quantity}</span>
                    <button
                      className="btn p-1"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <FontAwesomeIcon icon={faCaretRight} />
                    </button>
                  </div>
                </div>
                <button
                  className="btn btn-dark rounded-0 border border-secondary fst-italic"
                  onClick={handleAddToCart}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Description */}
        <div className="p-3 pt-5 ">
          <h6 className="bg-dark d-inline text-white my-5 p-3 fst-italic">
            DESCRIPTION
          </h6>
          <h5 className="my-5 fst-italic">PRODUCT DESSCRIPTION</h5>
          <p
            dangerouslySetInnerHTML={{ __html: formattedText }}
            className="text-secondary"
          ></p>
        </div>
        {/* related product */}
        <div className="p-3">
          <h5 className="my-5 fst-italic">RELATED PRODUCTS</h5>
          <ul className="row p-0 mt-4" style={{ listStyleType: "none" }}>
            {productList &&
              productList.map((item) => (
                <ProductItem
                  key={item._id}
                  img1={item.img1}
                  name={item.name}
                  short_desc={item.short_desc}
                  price={item.price}
                />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
