import { json } from "react-router-dom";
import AnotherInfo from "../component/homePage/AnotherInfo";
import Banner from "../component/homePage/Banner";
import Category from "../component/homePage/Category";
import ProductList from "../component/ProductList";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <Category />
      <ProductList />
      <AnotherInfo />
    </div>
  );
};

export default HomePage;

//get Api
export async function loader() {
  const response = await fetch(
    "https://asm3-sever-app.onrender.com/shop/products"
  );

  if (!response.ok) {
    throw json(
      { message: "Could not fetch events" },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}
