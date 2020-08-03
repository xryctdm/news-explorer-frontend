export default class FormValidator {
  validateEmail(email) {
    return email.length > 5 && email.indexOf('@')>0;
  }

  validateExistance(value) {
    if (value.length === 0) {
      return false;
    }
    return true;
  }
}

