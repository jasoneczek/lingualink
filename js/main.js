// Main component
const article = document.querySelector('.article-grid');

// Form and inputs
const form = document.getElementById('form');
const currLang = document.getElementById('curr-lang');
const targLang = document.getElementById('targ-lang');
const fName = document.getElementById('fname');
const lName = document.getElementById('lname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const pwd = document.getElementById('pwd');
const confirmPwd = document.getElementById('confirm-pwd');
const inputs = document.querySelectorAll('input');
const selects = document.querySelectorAll('select');

// Modal elements
const modal = document.getElementById('success-modal');
const closeBtn = document.getElementById('close-btn');
const langChoice = document.getElementById('lang-choice');

// Error messages
const currLangErr = document.getElementById('error-curr-lang');
const targLangErr = document.getElementById('error-targ-lang');
const firstNameErr = document.getElementById('error-fname');
const lastNameErr = document.getElementById('error-lname');
const emailErr = document.getElementById('error-email');
const telErr = document.getElementById('error-tel');
const pwdErr = document.getElementById('error-pwd');
const pwdErrReq = document.getElementById('pwd-err-req');
const confPwdErr = document.getElementById('error-confirm-pwd');

const handleSubmit = e => {
  e.preventDefault();

  const isCurrLangValid = validateCurrentLanguage();
  const isTargLangValid = validateTargetLanguage();
  const areDifferentLanguages = validateDifferentLanguages();
  const isValidFirstName = validateFirstName();
  const isValidLastName = validateLastName();
  const isValidEmail = validateEmail();
  const isValidPhoneNumber = validatePhoneNumber();
  const isValidPwd = validatePassword();

  if (
    isCurrLangValid &&
    isTargLangValid &&
    areDifferentLanguages &&
    isValidFirstName &&
    isValidLastName &&
    isValidEmail &&
    isValidPhoneNumber &&
    isValidPwd
  ) {
    article.classList.add('hidden');
    modal.style.display = 'flex';

    displayLangSelects();
  }
};

// Validate user's native language
const validateCurrentLanguage = () => {
  const currLangSelect = currLang.value;

  if (!currLangSelect) {
    currLangErr.textContent = `Please select a language.`;
    currLang.classList.add('input-error');
    return false;
  }

  currLangErr.textContent = '';
  return true;
};

// Validate user's target language
const validateTargetLanguage = () => {
  const targLangSelect = targLang.value;

  if (!targLangSelect) {
    targLangErr.textContent = `Please select a language.`;
    targLang.classList.add('input-error');
    return false;
  }
  targLangErr.textContent = '';
  return true;
};

// Validate user did not select same language twice
const validateDifferentLanguages = () => {
  const currLangSelect = currLang.value;
  const targLangSelect = targLang.value;

  if (currLangSelect && targLangSelect && currLangSelect === targLangSelect) {
    targLangErr.textContent = `Cannot be same languages.`;
    currLang.classList.add('input-error');
    targLang.classList.add('input-error');
    return false;
  }
  return true;
};

// Validate first name
const validateFirstName = () => {
  const firstName = fName.value.trim();
  const firstNameRegex = /^[a-zA-Z\s]{1,30}$/;

  if (!firstNameRegex.test(firstName)) {
    firstNameErr.textContent = 'First name must be 1 - 30 letters.';
    fName.classList.add('input-error');
    return false;
  }
  firstNameErr.textContent = '';
  fName.classList.remove('input-error');
  return true;
};

// Validate last name
const validateLastName = () => {
  const lastName = lName.value.trim();
  const lastNameRegex = /^[a-zA-Z\s\-]{1,50}$/;

  if (!lastNameRegex.test(lastName)) {
    lastNameErr.textContent = 'Last name must be 1 - 50 characters.';
    lName.classList.add('input-error');
    return false;
  }
  lastNameErr.textContent = '';
  lName.classList.remove('input-error');
  return true;
};

// Validate email
const validateEmail = () => {
  const emailAddress = email.value.trim();
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!emailRegex.test(emailAddress)) {
    emailErr.textContent = 'Please enter valid email.';
    email.classList.add('input-error');
    return false;
  }
  emailErr.textContent = '';
  email.classList.remove('input-error');
  return true;
};

// Validate phone number
const validatePhoneNumber = () => {
  const phoneNumber = phone.value.trim();
  const phoneNumberRegex = /^\+?[0-9]{1,3}\s?[0-9]{6,14}$/;

  if (!phoneNumber) {
    telErr.textContent = '';
    phone.classList.remove('input-error');
    return true;
  }

  if (!phoneNumberRegex.test(phoneNumber)) {
    telErr.textContent = 'Invalid phone number.';
    phone.classList.add('input-error');
    return false;
  }

  telErr.textContent = '';
  phone.classList.remove('input-error');
  return true;
};

// Validate password
const validatePassword = () => {
  const password = pwd.value.trim();
  const confirmPassword = confirmPwd.value.trim();
  const pwdRegex =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,30}$/;

  if (!pwdRegex.test(password)) {
    pwdErr.textContent = 'Invalid password.';
    pwdErrReq.textContent =
      'Password must be 8 to 30 characters long and include at least one letter, one number, and one special character.';
    pwd.classList.add('input-error');
    return false;
  }
  if (password !== confirmPassword) {
    confPwdErr.textContent = 'Passwords do not match.';
    confirmPwd.classList.add('input-error');
    return false;
  }

  pwdErr.textContent = '';
  pwdErrReq.textContent = '';
  confPwdErr.textContent = '';
  pwd.classList.remove('input-error');
  confirmPwd.classList.remove('input-error');
  return true;
};

// Confirm user's language selections in the modal success message
const displayLangSelects = () => {
  const curr = currLang.value;
  const targ = targLang.value;

  langChoice.innerHTML = `You have selected <span class="modal-lang">${curr}</span> as your current language and <span class="modal-lang">${targ}</span> as your target language. A language tutor will be in contact with you based on your selections.`;
};

// Close modal
const closeModal = () => {
  article.classList.remove('hidden');
  modal.style.display = 'none';

  clearInputs();
};

// Clear inputs when closing success modal
function clearInputs() {
  inputs.forEach(input => {
    input.value = '';
  });
  selects.forEach(select => {
    select.value = '';
  });
}

// Clear error messages and styles when user re-enters data
const handleInputChange = input => {
  const errorIds = input.getAttribute('aria-describedby').split(' ');

  errorIds.forEach(errorId => {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      errorElement.textContent = '';
    }
  });

  if (input.classList.contains('input-error')) {
    input.classList.remove('input-error');
  }
};

// Clear errors for text inputs
inputs.forEach(input => {
  input.addEventListener('input', () => {
    handleInputChange(input);
  });
});

// Clear errors for selects
selects.forEach(select => {
  select.addEventListener('change', () => {
    handleInputChange(select);
  });
});

// Event listeners
form.addEventListener('submit', handleSubmit);
closeBtn.addEventListener('click', closeModal);
