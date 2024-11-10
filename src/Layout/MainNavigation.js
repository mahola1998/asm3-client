import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faUser,
  faCaretDown,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./MainNavigation.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const MainNavigation = ({ currentUser, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await fetch("https://asm3-sever-app.onrender.com/auth/logout", {
      method: "GET",
      credentials: "include",
    });
    navigate("/login");
    setIsLoggedIn(false);
  };

  return (
    <div className="row justify-content-center w-100 m-auto">
      <div className="col-lg-7 p-0">
        <div className={styles.nav}>
          <div className="d-flex">
            <NavLink to="" className={styles["link-to"]} end>
              <h2>
                <em>
                  <span className={styles.home}>Home&nbsp;</span>
                </em>
              </h2>
            </NavLink>
            <NavLink to="/shop" className={styles["link-to"]} end>
              <h2>
                <em>Shop</em>
              </h2>
            </NavLink>
          </div>

          <h1>
            <em>BOUTIQUE</em>
          </h1>

          <div className={styles["link-container"]}>
            <NavLink
              to="cart"
              className={(isActive) => (isActive ? styles.active : "")}
            >
              <FontAwesomeIcon icon={faCartArrowDown} className={styles.icon} />
              <span>Cart</span>
            </NavLink>
            {isLoggedIn ? (
              <div className="d-flex gap-2">
                <NavLink
                  to="order"
                  className={(isActive) => (isActive ? styles.active : "")}
                >
                  <FontAwesomeIcon
                    icon={faClockRotateLeft}
                    className={styles.icon}
                  />
                  <span>order</span>
                </NavLink>
                <NavLink className={styles.link}>
                  <FontAwesomeIcon icon={faUser} className={styles.icon} />
                  {currentUser}
                  <FontAwesomeIcon icon={faCaretDown} />
                </NavLink>
                <button
                  className="btn btn-outline-secondary border border-0"
                  onClick={logoutHandler}
                >
                  (Logout)
                </button>
              </div>
            ) : (
              <NavLink to="login" className={styles.link}>
                <FontAwesomeIcon icon={faUser} className={styles.icon} />
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
