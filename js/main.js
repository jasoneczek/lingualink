const form = document.getElementById('form');
const article = document.querySelector('.article-grid');
const modal = document.getElementById('success-modal');
const currLang = document.getElementById('curr-lang');
const targLang = document.getElementById('targ-lang');
const closeBtn = document.getElementById('close-btn');
const langChoice = document.getElementById('lang-choice');

const handleSubmit = e => {
  e.preventDefault();

  article.classList.add('hidden');
  modal.style.display = 'flex';

  displayLangSelects();
};

const closeModal = () => {
  article.classList.remove('hidden');
  modal.style.display = 'none';
};

const displayLangSelects = () => {
  const curr = currLang.value;
  const targ = targLang.value;

  langChoice.innerHTML = `You have selected <span class="modal-lang">${curr}</span> as your current language and <span class="modal-lang">${targ}</span> as your target language. A language tutor will be in contact with you based on your selections.`;
};

form.addEventListener('submit', handleSubmit);
closeBtn.addEventListener('click', closeModal);
