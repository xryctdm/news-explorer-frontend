export default class RegistrationForm {
  constructor(
      selector,
      popupRegistration,
      validationMessage,
      submitButton,
      formValidator,
      afterSuccessValidationEvent,
      )
    {
    this.selector = selector;
    this.popupRegistration = popupRegistration;
    this.validationMessage = validationMessage;
    this.submitButton = submitButton;
    this.formValidator = formValidator;
    this.afterSuccessValidationEvent = afterSuccessValidationEvent;

    this.addEvents();
  }


  validate() {
    if (this.isValidFields()) {
        this.submitButton.removeAttribute('disabled');
        this.submitButton.classList.remove('popup__button_disabled');
    } else {
        this.submitButton.setAttribute('disabled', true);
       this.submitButton.classList.add('popup__button_disabled');
    }
  }

  isValidFields() {
    return this.getValidateErrorEmailField() === null &&
            this.getValidateErrorPasswordField() === null &&
            this.getValidateErrorNameField() === null;
  }

  getValidateErrorEmailField() {
    const email = document.querySelector('#registration-email');
    if (!this.formValidator.validateExistance(email.value)) {
      return this.validationMessage.required;
    }

    if (!this.formValidator.validateEmail(email.value)) {
        return this.validationMessage.notEmail;
    }

    return null;
}

  getValidateErrorPasswordField() {
    const password = document.querySelector('#registration-password');

   if (!this.formValidator.validateExistance(password.value)) {
      return this.validationMessage.required;
    }

    if (password.value.length < 8) {
      return this.validationMessage.wrongLengthPassword;
    }

    return null;
  }

  getValidateErrorNameField() {
    const name = document.querySelector('#registration-name');

    if (!this.formValidator.validateExistance(name.value)) {
      return this.validationMessage.required;
    }

    if (name.value.length < 2 || name.value.length > 30) {
      return this.validationMessage.wrongLength;
    }

    return null;
  }

validateEmailField() {

  const errorEmail = document.querySelector('#error-registration-email');
  errorEmail.textContent = this.getValidateErrorEmailField();
}

validatePasswordField() {
  const errorPassword = document.querySelector('#error-registration-password');
  errorPassword.textContent = this.getValidateErrorPasswordField();
}

validateNameField() {
  const errorName = document.querySelector('#error-registration-name');
  errorName.textContent = this.getValidateErrorNameField();
}

save(event) {
  event.preventDefault();
  const email = document.querySelector('#registration-email');
  const password = document.querySelector('#registration-password');
  const name = document.querySelector('#registration-name');

  this.afterSuccessValidationEvent(email, password, name);
}

  addEvents() {
    this.submitButton.addEventListener('click', (event) => { this.save(event) });
    this.selector.addEventListener('input', () => { this.validate() });
    document.querySelector('#registration-email').addEventListener('input', () => { this.validateEmailField() });
    document.querySelector('#registration-password').addEventListener('input', () => { this.validatePasswordField() });
    document.querySelector('#registration-name').addEventListener('input', () => { this.validateNameField() });
  }

}