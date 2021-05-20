import React, { useState, useRef } from "react";
import styles from "./MealItemForm.module.css";
import Input from "../UI/Input";

const MealItemForm = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = inputRef.current.value.trim();
    const enteredAmountValue = +enteredAmount;
    props.onUpdateQuantity(enteredAmountValue);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <Input
        label="Qty"
        input={{
          ref: inputRef,
          id: "qty_" + props.id,
          max: 5,
          min: 1,
          step: 1,
          type: "number",
          defaultValue: 1,
        }}
      />
      <button>Add Item</button>
    </form>
  );
});

export default MealItemForm;
