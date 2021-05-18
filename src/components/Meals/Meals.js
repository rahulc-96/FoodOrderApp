import styles from "./Meals.module.css";
import React, { Fragment } from "react";
import MealsSummary from "./MealsSummary";
import MealItem from "./MealItem";
import Card from "../UI/Card";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const Meals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      description={meal.description}
      price={meal.price}
      title={meal.name}
    />
  ));

  return (
    <Fragment>
      <MealsSummary />
      <Card className={styles.meals}>
        <ul>{mealsList}</ul>
      </Card>
    </Fragment>
  );
};

export default Meals;
