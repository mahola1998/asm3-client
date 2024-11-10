import styles from "./NavbarShopPage.module.css";

const NavBarShopPage = (props) => {
  const onClickHandler = (event) => {
    props.onButtonClickHandler(event);
  };

  return (
    <div className={styles.nav}>
      <h4 className="pb-3">CATEGORIES</h4>
      <h6 className="bg-dark text-white fw-normal p-2 px-3">APPLE</h6>

      <button
        className={`btn fst-italic text-secondary p-1 px-3 ${
          props.category === "all" ? "text-warning" : undefined
        }`}
        value="all"
        onClick={onClickHandler}
      >
        All
      </button>

      <h6 className="p-2 px-3 my-1" style={{ backgroundColor: "#f3f5f2" }}>
        IPHONE & MAC
      </h6>
      <button
        className={`d-block btn fst-italic text-secondary p-1 px-3 ${
          props.category === "iphone" ? "text-warning" : undefined
        }`}
        value="iphone"
        onClick={onClickHandler}
      >
        IPhone
      </button>
      <button
        className={`d-block btn fst-italic text-secondary p-1 px-3 ${
          props.category === "ipad" ? "text-warning" : undefined
        }`}
        value="ipad"
        onClick={onClickHandler}
      >
        IPad
      </button>
      <button
        className={`d-block btn fst-italic text-secondary p-1 px-3 ${
          props.category === "macbook" ? "text-warning" : undefined
        }`}
        value="macbook"
        onClick={onClickHandler}
      >
        Macbook
      </button>
      <h6 className="p-2 px-3 my-1" style={{ backgroundColor: "#f3f5f2" }}>
        WIRELESS
      </h6>
      <button
        className={`d-block btn fst-italic text-secondary p-1 px-3 ${
          props.category === "airpod" ? "text-warning" : undefined
        }`}
        value="airpod"
        onClick={onClickHandler}
      >
        Airpod
      </button>
      <button
        className={`d-block btn fst-italic text-secondary p-1 px-3 ${
          props.category === "watch" ? "text-warning" : undefined
        }`}
        value="watch"
        onClick={onClickHandler}
      >
        Watch
      </button>
      <h6
        className="d-block p-2 px-3 my-1"
        style={{ backgroundColor: "#f3f5f2" }}
      >
        OTHER
      </h6>
      <button
        className={`d-block btn fst-italic text-secondary p-1 px-3 ${
          props.category === "mouse" ? "text-warning" : undefined
        }`}
        value="mouse"
        onClick={onClickHandler}
      >
        Mouse
      </button>
      <button
        className={`d-block btn fst-italic text-secondary p-1 px-3 ${
          props.category === "keyboard" ? "text-warning" : undefined
        }`}
        value="keyboard"
        onClick={onClickHandler}
      >
        Keyboard
      </button>
      <button
        className={`d-block btn fst-italic text-secondary p-1 px-3 ${
          props.category === "other" ? "text-warning" : undefined
        }`}
        value="other"
        onClick={onClickHandler}
      >
        Other
      </button>
    </div>
  );
};

export default NavBarShopPage;
