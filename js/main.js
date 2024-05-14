const form = document.getElementById('form');
const article = document.querySelector('.article-grid');
const modal = document.getElementById('success-modal');
const currLang = document.getElementById('curr-lang');
const targLang = document.getElementById('targ-lang');
const closeBtn = document.getElementById('close-btn');

const handleSubmit = e => {
  e.preventDefault();

  article.classList.add('hidden');
  modal.style.display = 'flex';
};

const closeModal = () => {
  article.classList.remove('hidden');
  modal.style.display = 'none';
};

form.addEventListener('submit', handleSubmit);
closeBtn.addEventListener('click', closeModal);
