function formStateReducer(state, action) {
  const { name, error, validation, value } = action.payload;

  switch (action.type) {
    case "UPDATE_ERROR_AND_VALUE":
      return {
        ...state,
        errors: {
          ...state.errors,
          [name]: error,
        },
        values: {
          ...state.values,
          [name]: value,
        },
      };
    case "UPDATE_ERROR_STATE":
      return {
        ...state,
        errors: {
          ...state.errors,
          [name]: error,
        },
      };
    case "UPDATE_VALIDATION_STATE":
      return {
        ...state,
        validations: {
          ...state.validations,
          [name]: validation,
        },
      };
    case "UPDATE_VALUE_ERROR_VALIDATION_STATE":
      return {
        ...state,
        errors: {
          ...state.errors,
          [name]: error,
        },
        validations: {
          ...state.validations,
          [name]: validation,
        },
        values: {
          ...state.values,
          [name]: value,
        },
      };
    case "UPDATE_FORM_STATE":
      return {
        ...action.payload,
      };
    case "UPDATE_FORM_VALUES":
      return {
        ...state,
        values: {
          ...state.values,
          [name]: value,
        },
      };
    default:
      return state;
  }
}

export default formStateReducer;
