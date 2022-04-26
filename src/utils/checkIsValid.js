function checkIsValid(value, validations) {
  let isValid = true;

  Object.keys(validations).forEach((validation) => {
    const validationRule = validation;
    const validationValue = validations[validation];

    if (isValid === false) {
      return;
    }

    switch (validationRule) {
      case "required":
        isValid = value?.trim() !== "";
        break;
      case "minLength":
        isValid = value.length >= validationValue;
        break;
      case "maxLength":
        isValid = value.length <= validationValue;
        break;
      case "email":
        isValid =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          );
        break;
      default:
        isValid = true;
    }
  });
  return isValid;
}

export default checkIsValid;
