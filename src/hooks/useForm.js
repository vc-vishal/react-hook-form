import { useReducer, useRef, useState } from "react";
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
  const [isDirty, setIsDirty] = useState(false);
  const [renderFormState, dispatch] = useReducer(
    formStateReducer,
    formStateRef.current
  );

  function getMap() {
    if (!inputsRef.current) {
      inputsRef.current = new Map();
    }
    return inputsRef.current;
  }

  function updateRenderFormState() {
    dispatch({
      type: "UPDATE_FORM_STATE",
      payload: formStateRef.current,
    });
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
      const inputValidations = formStateRef.current.validations[name];
      const hasError = !checkIsValid(value, inputValidations);
      const updatedState = formStateReducer(formStateRef.current, {
        type: "UPDATE_ERROR_AND_VALUE",
        payload: { name: name, error: hasError, value },
      });
      formStateRef.current = updatedState;

      if (isDirty) {
        updateRenderFormState();
      }
    }
  }

  function register(name, options = {}) {
    const validation = options ? options : {};

    if (
      !Object.keys(formStateRef.current.errors).includes(name) &&
      validation
    ) {
      const updatedState = formStateReducer(formStateRef.current, {
        type: "UPDATE_VALUE_ERROR_VALIDATION_STATE",
        payload: { name, error: false, validation, value: "" },
      });
      formStateRef.current = updatedState;
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
    return formStateRef.current.values;
  }

  function getValue(name) {
    const values = getValues();
    return values[name];
  }

  const handleSubmit = (event, callback) => {
    event.preventDefault();
    const values = getValues();
    let isFormValid = true;
    setIsDirty(true);

    Object.keys(formStateRef.current.values).forEach(async (key) => {
      const inputValidations = formStateRef.current.validations[key];
      const hasError = !checkIsValid(values[key] || "", inputValidations);

      const updatedState = formStateReducer(formStateRef.current, {
        type: "UPDATE_ERROR_STATE",
        payload: { name: key, error: hasError },
      });
      formStateRef.current = updatedState;
      await updateRenderFormState();
    });

    Object.keys(formStateRef.current.errors).forEach((key) => {
      if (formStateRef.current.errors[key] === true) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      callback(values);
    }
  };

  return {
    register,
    setValue,
    getValues,
    getValue,
    unRegister,
    formState: isDirty ? renderFormState : formStateRef.current,
    handleSubmit,
  };
}
