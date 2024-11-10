const AnotherInfo = () => {
  return (
    <div className="row w-100 justify-content-center m-auto">
      <div className="col-lg-7">
        <div className="fst-italic">
          <div className="bg-body-secondary row text-center py-5 w-100 m-auto">
            <div className="col-4">
              <h4>FREE SHIPPING</h4>
              <p className="text-secondary">Free shipping worlwide</p>
            </div>
            <div className="col-4">
              <h4>24 X 7 SERVICE</h4>
              <p className="text-secondary">Free shipping worlwide</p>
            </div>
            <div className="col-4">
              <h4>FESTIVAL OFFER</h4>
              <p className="text-secondary">Free shipping worlwide</p>
            </div>
          </div>

          <div className="row align-items-center py-5">
            <div className="col-6 ps-4">
              <h3>LET'S BE FRIENDS!</h3>
              <p className="text-secondary">
                Nisi nisi tempor consequat laboris nisi.
              </p>
            </div>
            <div className="col-6">
              <div className="input-group ">
                <input
                  type="text"
                  className="form-control rounded-0"
                  placeholder="Enter your email address"
                />
                <button className="btn btn-dark rounded-0">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AnotherInfo;
