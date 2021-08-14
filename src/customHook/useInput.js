import {useReducer} from 'react'

const useInput = (validator) => {

    const defaultState = {
        isInputTouched: false,
        enteredValue: ''
    }

    const inputReducer = (prevState, action) => {
        if(action.type === 'reset'){
            return defaultState;
        }else if(action.type === 'blur'){
            return {...prevState, isInputTouched:true}
        }else if(action.type === 'change'){
            return{...prevState, enteredValue:action.value}
        }

        return defaultState
    }

    const [inputState, inputDispatcher] = useReducer(inputReducer, defaultState);
    const isInputValid = validator(inputState.enteredValue);
    const isError = inputState.isInputTouched && !isInputValid;

    const blurHandler = () => {
        inputDispatcher({type:'blur', value:''});
    }
    const changeHandler = (enteredValue) => {
        inputDispatcher({type:'change', value:enteredValue});
    }

    const resetHandler = () => {
        inputDispatcher({type:'reset', value:''});
    }

    return {
        enteredValue:inputState.enteredValue,
        isInputValid,
        blurHandler,
        changeHandler,
        resetHandler,
        isError
    }

}

export default useInput;
