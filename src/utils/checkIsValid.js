function checkIsValid(value, validationRule, validationValue) {
  let isValid = true;
  switch (validationRule) {
    case "required":
      isValid = value.trim() !== "";
      break;
    case "minLength":
      isValid = value.length >= validationValue;
      break;
    case "maxLength":
      isValid = value.length <= validationValue;
      break;
    case "email":
      isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
      break;
    default:
      isValid = true;
  }
  return isValid;
}

export default checkIsValid;
