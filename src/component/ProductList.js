import { useLoaderData } from "react-router-dom";
import ProductItem from "./ProductItem";

const ProductList = (props) => {
  const products = useLoaderData();

  return (
    <div className="row justify-content-center w-100 m-auto">
      <div className="col-lg-7 m-3">
        <p className="my-1 text-secondary">MADE THE HARD WAY</p>
        <h3 className="fw-normal">TOP TRENDING PRODUCTS</h3>
      </div>
      <div className="col-lg-7 m-3">
        <ul className="row p-0" style={{ listStyleType: "none" }}>
          {products.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              img1={item.img1}
              name={item.name}
              short_desc={item.short_desc}
              price={item.price}
              page={props.page}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
