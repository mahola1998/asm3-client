import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductItem from "../component/ProductItem";
import NavBarShopPage from "../component/shopPage/NavbarShopPage";
import Pagination from "../component/shopPage/Pagination";

const ShopPage = () => {
  const [category, setCategory] = useState("all");
  const products = useLoaderData();
  const [filterProducts, setFilterProducts] = useState(products);

  const onClickHandler = (event) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    if (category === "all") {
      setFilterProducts(products);
    } else {
      setFilterProducts(
        products.filter((product) => product.category === category)
      );
    }
  }, [category]);

  return (
    <div className="row justify-content-center w-100 fst-italic m-auto mb-5">
      <div className="col-lg-7 p-0">
        <div className="mb-5" style={{ backgroundColor: "#f3f5f2" }}>
          <div className="d-flex justify-content-between align-items-center p-5 ">
            <h2 className="m-0">SHOP</h2>
            <p className="text-secondary m-0">SHOP</p>
          </div>
        </div>
        <div className="row w-100">
          <div className="col-3">
            <NavBarShopPage
              onButtonClickHandler={onClickHandler}
              category={category}
            />
          </div>
          <div className="col-9">
            <div className="d-flex justify-content-between">
              <input type="text" placeholder="Enter Search Here!" />
              <select name="sort" id="sort">
                <option value="default">Default sorting</option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>
            </div>
            <ul className="row p-0 mt-4" style={{ listStyleType: "none" }}>
              {filterProducts.map((item) => (
                <ProductItem
                  key={Object.values(item._id)[0]}
                  id={item._id}
                  img1={item.img1}
                  name={item.name}
                  short_desc={item.short_desc}
                  price={item.price}
                  page="shopPage"
                />
              ))}
            </ul>
            <div className="d-flex justify-content-end">
              <Pagination products={products} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
