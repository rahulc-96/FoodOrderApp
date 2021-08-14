import styles from "./Meals.module.css";
import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  Fragment,
} from "react";
import MealsSummary from "./MealsSummary";
import MealItem from "./MealItem";
import Card from "../UI/Card";
import useHttpClient from "../../customHook/useHttpClient";

const Meals = () => {
  const [meals, setMeals] = useState(null);
  const { isLoading, isError, sendRequest: fetchMeals } = useHttpClient();

  const fetchMealsResponseHandler = useCallback((response) => {
    let loadedMeals = [];
    for (const key in response) {
      loadedMeals.push({
        id: key,
        description: response[key].description,
        price: response[key].price,
        name: response[key].name,
      });
    }
    setMeals(loadedMeals);
  }, []);

  const request = useMemo(() => {
    return {
      url: "https://food-cart-6307a-default-rtdb.firebaseio.com/meals.json",
    };
  }, []);

  useEffect(() => {
    fetchMeals(request, fetchMealsResponseHandler);
  }, [fetchMeals, request, fetchMealsResponseHandler]);

  let mealsList = [];
  let content = null;
  if (meals != null && meals.length > 0) {
    mealsList = meals.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        description={meal.description}
        price={meal.price}
        title={meal.name}
      />
    ));
    content = <ul>{mealsList}</ul>;
  } else {
    content = <p>No Meals Found</p>;
  }

  if (isLoading) {
    content = <p>Fetching Meals</p>;
  }

  if (isError) {
    content = <p>Try Reloading Page</p>;
  }

  return (
    <Fragment>
      <MealsSummary />
      <Card className={styles.meals}>{content}</Card>
    </Fragment>
  );
};

export default Meals;
