import { useNavigate } from "react-router-dom";
import bannerImg from "../../img/banner1.jpg";

const Banner = () => {
  const navigate = useNavigate();

  const buttonHandler = () => {
    navigate("/shop");
  };

  return (
    <div className="row w-100 m-auto justify-content-center">
      <div className="col-lg-7">
        <div className="position-relative">
          <img src={bannerImg} alt="banner" className="w-100" />
          <div className="position-absolute translate-middle-y top-50 start-0 ">
            <div className="m-5 w-75 fst-italic">
              <p className="m-1 text-secondary">NEW INSPIRATION</p>
              <h1>20% OFF ON NEW SEASON</h1>
              <button onClick={buttonHandler} className="btn btn-outline-dark">
                Browse colections
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
