import classes from "./Checkout.module.css";
import useInput from "../../customHook/useInput";

const Checkout = (props) => {
  const textValidator = (val) => {
    return val.trim().length > 0;
  };
  const postalValidator = (val) => {
    return val.trim().length === 5 && !isNaN(val.trim());
  };

  const {
    enteredValue: nameValue,
    isInputValid:nameValid,
    blurHandler:nameBlurHandler,
    changeHandler:nameChangeHandler,
    resetHandler:nameResetHandler,
    isError:isNameError,
  } = useInput(textValidator);
  const {
    enteredValue: streetValue,
    isInputValid:streetValid,
    blurHandler:streetBlurHandler,
    changeHandler:streetChangeHandler,
    resetHandler:streetResetHandler,
    isError:isStreetError,
  } = useInput(textValidator);
  const {
    enteredValue: postalValue,
    isInputValid:postalValid,
    blurHandler:postalBlurHandler,
    changeHandler:postalChangeHandler,
    resetHandler:postalResetHandler,
    isError:isPostalError,
  } = useInput(postalValidator);
  const {
    enteredValue: cityValue,
    isInputValid:cityValid,
    blurHandler:cityBlurHandler,
    changeHandler:cityChangeHandler,
    resetHandler:cityResetHandler,
    isError:isCityError,
  } = useInput(textValidator);

  const onBlurHandler = (event) => {
    if (event.target.id === "name") {
      nameBlurHandler();
    }
    if (event.target.id === "city") {
      cityBlurHandler();
    }
    if (event.target.id === "postal") {
      postalBlurHandler();
    }
    if (event.target.id === "street") {
      streetBlurHandler();
    }
  };

  const onChangeHandler = (event) => {
    if (event.target.id === "name") {
      nameChangeHandler(event.target.value);
    }
    if (event.target.id === "city") {
      cityChangeHandler(event.target.value);
    }
    if (event.target.id === "postal") {
      postalChangeHandler(event.target.value);
    }
    if (event.target.id === "street") {
      streetChangeHandler(event.target.value);
    }
  };

  const isFormValid= cityValid && nameValid && postalValid && streetValid;
  const confirmHandler = (event) => {
    event.preventDefault();
    const inputUserDetails = {
      name: nameValue.trim(),
      city: cityValue.trim(),
      street: streetValue.trim(),
      postal: postalValue.trim(),
    };
    nameResetHandler();
    cityResetHandler();
    streetResetHandler();
    postalResetHandler();
    console.log(inputUserDetails);
    props.onConfirm(inputUserDetails)
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${isNameError ? classes.invalid : ''}`}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
        />
        {isNameError && <p>Enter valid name</p>}
      </div>
      <div className={`${classes.control} ${isStreetError ? classes.invalid : ''}`}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
        />
        {isStreetError && <p>Enter valid street</p>}
      </div>
      <div className={`${classes.control} ${isPostalError ? classes.invalid : ''}`}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
        />
        {isPostalError && <p>Enter valid postal code</p>}
      </div>
      <div className={`${classes.control} ${isCityError ? classes.invalid : ''}`}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
        />
        {isCityError && <p>Enter valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled ={!isFormValid} className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
