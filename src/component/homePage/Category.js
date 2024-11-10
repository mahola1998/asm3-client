import { Link } from "react-router-dom";
import product1 from "../../img/product_1.png";
import product2 from "../../img/product_2.png";
import product3 from "../../img/product_3.png";
import product4 from "../../img/product_4.png";
import product5 from "../../img/product_5.png";
import styles from "./Category.module.css";

const Category = () => {
  return (
    <div className="mt-5 fst-italic">
      <div className="text-center">
        <p className="text-secondary mb-1">CAREFULLY CREATED COLLECTIONS</p>
        <h3 className="fw-normal">BROWSE OUR CATEGORIES</h3>
      </div>
      <div className="row justify-content-center w-100 m-auto">
        <div className="row py-1 col-lg-7">
          <div className="col-6 p-1">
            <Link to="shop" className={styles["category-link"]}>
              <img src={product1} alt="product 1" className="w-100" />
            </Link>
          </div>
          <div className="col-6 p-1">
            <Link to="shop" className={styles["category-link"]}>
              <img src={product2} alt="product 2" className="w-100" />
            </Link>
          </div>
        </div>
        <div className="row p-1 col-lg-7">
          <div className="col-4 p-1">
            <Link to="shop" className={styles["category-link"]}>
              <img src={product3} alt="product 3" className="w-100" />
            </Link>
          </div>
          <div className="col-4 p-1">
            <Link to="shop" className={styles["category-link"]}>
              <img src={product4} alt="product 4" className="w-100" />
            </Link>
          </div>
          <div className="col-4 p-1">
            <Link to="shop" className={styles["category-link"]}>
              <img src={product5} alt="product 5" className="w-100" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
