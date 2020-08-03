export default class LoginForm {
  constructor(
    selector,
    popupLogin,
    validationMessage,
    submitButton,
    formValidator,
    afterSuccessValidationEvent,
    )
    {
      this.selector = selector;
      this.popupLogin = popupLogin;
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
           this.getValidateErrorPasswordField() === null;
  }

  getValidateErrorEmailField() {
    const email = document.querySelector('#login-email');
    if (!this.formValidator.validateExistance(email.value)) {
      return this.validationMessage.required;
    }

    if (!this.formValidator.validateEmail(email.value)) {
        return this.validationMessage.notEmail;
    }
    return null;
}

  getValidateErrorPasswordField() {
    const password = document.querySelector('#login-password');

   if (!this.formValidator.validateExistance(password.value)) {
      return this.validationMessage.required;
    }

    if (password.value.length < 8) {
      return this.validationMessage.wrongLengthPassword;
    }
    return null;
  }

  validateEmailField() {

    const errorEmail = document.querySelector('#error-login-email');
    errorEmail.textContent = this.getValidateErrorEmailField();
  }

  validatePasswordField() {
    const errorPassword = document.querySelector('#error-login-password');
    errorPassword.textContent = this.getValidateErrorPasswordField();
  }

  save(event) {
    event.preventDefault();
    const email = document.querySelector('#login-email');
    const password = document.querySelector('#login-password');

    this.afterSuccessValidationEvent(email, password);
  }

  addEvents() {
    this.submitButton.addEventListener('click', (event) => { this.save(event) });
    this.selector.addEventListener('input', () => { this.validate() });
    document.querySelector('#login-email').addEventListener('input', () => { this.validateEmailField() });
    document.querySelector('#login-password').addEventListener('input', () => { this.validatePasswordField() });
  }
}