import React from "react";
import styles from "./MealItemForm.module.css";
import Input from '../UI/Input'

const MealItemForm = (props) => {
  return (
    <form className={styles.form}>
      <Input
        label="Amount"
        input={{
          id: "amount_" + props.id,
          max: 5,
          min: 0,
          step: 1,
          type: "number",
          defaultValue: 0,
        }}
      />
      <button>Add Item</button>
    </form>
  );
};

export default MealItemForm;
