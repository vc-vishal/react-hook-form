import { useRef } from "react";
import checkIsValid from "../utils/checkIsValid";
import formStateReducer from "../utils/formStateReducer";

const initialFormState = {
  errors: {},
  validations: [],
  values: {},
};

export function useForm() {
  const inputsRef = useRef(null);
  const formStateRef = useRef(initialFormState);
  let formState = formStateRef.current;

  function getMap() {
    if (!inputsRef.current) {
      inputsRef.current = new Map();
    }
    return inputsRef.current;
  }

  function ref(node) {
    const map = getMap();
    if (node) {
      map.set(node.name, node);
    }
  }

  function onChange(e) {
    const { name, value } = e.target;

    if (value) {
      const validations = formState.validations[name];
      Object.keys(validations).forEach((validation) => {
        const hasError = !checkIsValid(
          value,
          validation,
          validations[validation]
        );
        const updatedState = formStateReducer(formState, {
          type: "UPDATE_ERROR_AND_VALUE",
          payload: { name: name, error: hasError, value },
        });
        formState = updatedState;
      });
    }
  }

  function register(name, options = {}) {
    const validation = options ? options : {};

    if (!Object.keys(formState.errors).includes(name) && validation) {
      const updatedState = formStateReducer(formState, {
        type: "UPDATE_VALUE_ERROR_VALIDATION_STATE",
        payload: { name, error: false, validation, value: "" },
      });
      formState = updatedState;
    }

    return { onChange, name, ref };
  }

  function unRegister(name) {
    const map = getMap();
    map.delete(name);
  }

  function setValue(name, value) {
    const map = getMap();
    map.set(name, value);
  }

  function getValues() {
    console.log("formstate in getValues", formState);
    const map = getMap();
    return Array.from(map.entries()).reduce((acc, [key, value]) => {
      acc[key] = value["value"];
      return acc;
    }, {});
  }

  function getValue(name) {
    const values = getValues();
    return values[name];
  }

  function handleSubmit(event, callback) {
    event.preventDefault();
    const values = getValues();
    callback(values);
  }

  return {
    register,
    setValue,
    getValues,
    getValue,
    unRegister,
    formState,
    handleSubmit,
  };
}
