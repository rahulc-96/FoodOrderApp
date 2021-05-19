import React, { useState, useRef } from "react";
import styles from "./MealItemForm.module.css";
import Input from "../UI/Input";

const MealItemForm = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  const [isAmountValid, setIsAmountValid] = useState(true);
  
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = inputRef.current.value.trim();
    const enteredAmountValue = +enteredAmount;
    if (
      enteredAmountValue <= 0 ||
      enteredAmountValue > 5 ||
      enteredAmount.length < 0
    ) {
      setIsAmountValid(false);
      return;
    }
    setIsAmountValid(true);
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
      <button onClick="submit">Add Item</button>
      {!isAmountValid && <p>Please Add Valid Quantity</p>}
    </form>
  );
});

export default MealItemForm;
