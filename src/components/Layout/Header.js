import React, { Fragment } from "react";
import CartButton from "../Cart/CartButton";
import styles from "./Header.module.css";
import MealsImage from "../../media/meals.jpg";

const Header = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h2>Food Order App</h2>
        <CartButton onShowCart={props.onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={MealsImage} alt="Order Delicious Food !!" />
      </div>
    </Fragment>
  );
};

export default Header;
