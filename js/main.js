// Main component
const article = document.querySelector('.article-grid');

// Form and inputs
const form = document.getElementById('form');
const currLang = document.getElementById('curr-lang');
const targLang = document.getElementById('targ-lang');
const fName = document.getElementById('fname');
const lName = document.getElementById('lname');
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

const handleSubmit = e => {
  e.preventDefault();

  const isCurrLangValid = validateCurrentLanguage();
  const isTargLangValid = validateTargetLanguage();
  const areDifferentLanguages = validateDifferentLanguages();
  const isValidFirstName = validateFirstName();
  const isValidLastName = validateLastName();

  if (
    isCurrLangValid &&
    isTargLangValid &&
    areDifferentLanguages &&
    isValidFirstName &&
    isValidLastName
  ) {
    article.classList.add('hidden');
    modal.style.display = 'flex';

    displayLangSelects();
  }
};

// Input validations

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
  const errorId = input.getAttribute('aria-describedby');
  const errorElement = document.getElementById(errorId);

  if (input.classList.contains('input-error')) {
    input.classList.remove('input-error');
  }
  if (errorElement) {
    errorElement.textContent = '';
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
