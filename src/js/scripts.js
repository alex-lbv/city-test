const modal = document.querySelector('.modal');
const modalOpenedButton = document.querySelectorAll('.info__item');
const modalCloseButton = document.querySelector('.modal__close');
const modalCancelButton = document.querySelector('#modal-cancel');
const modalAcceptButton = document.querySelector('#modal-accept');
const modalBackground = document.querySelector('.modal__bg');

const openModal = () => {
  modal.classList.add('opened');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onPopupEscKeydown);
};

const closeModal = () => {
  modal.classList.remove('opened');
  document.body.style.removeProperty('overflow');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

modalOpenedButton.forEach((button) => button.addEventListener('click', openModal))
modalBackground.addEventListener('click', closeModal);
modalCloseButton.addEventListener('click', closeModal);
modalCancelButton.addEventListener('click', closeModal);
modalAcceptButton.addEventListener('click', closeModal);

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const form = document.querySelector('.form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const country = document.querySelector('#country');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  checkInputs();
});

const checkUsername = () => {
  const usernameValue = username.value.trim();

  if (usernameValue === '') {
    setErrorFor(username, 'Enter correct Name');
    return false;
  } else if (!isUsername(usernameValue)) {
    setErrorFor(username, 'Enter correct Name');
    return false;
  } else {
    setSuccessFor(username);
  }
};

const checkEmail = () => {
  const emailValue = email.value.trim();

  if (emailValue === '') {
    setErrorFor(email, 'Enter correct E-Mail');
    return false;
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, 'Enter correct E-Mail');
    return false;
  } else {
    setSuccessFor(email);
  }
};

const checkCountry = () => {
  const countryValue = country.value.trim();

  if (countryValue === '') {
    setErrorFor(country, 'Select your country');
    return false;
  } else {
    setSuccessFor(country);
  }
};

const checkInputs = () => {
  checkUsername();
  checkEmail();
  checkCountry();
};

email.addEventListener('input', checkEmail);
username.addEventListener('input', checkUsername);
country.addEventListener('input', checkCountry);

const setErrorFor = (input, message) => {
  const formGroup = input.parentElement;
  const error = formGroup.querySelector('.form__error-message');
  error.textContent = message;
  if (formGroup.classList.contains('valid')) {
    formGroup.classList.remove('valid');
  }
  formGroup.classList.add('invalid');
};

const setSuccessFor = (input) => {
  const formGroup = input.parentElement;
  if (formGroup.classList.contains('invalid')) {
    formGroup.classList.remove('invalid');
  }
  formGroup.classList.add('valid');
};

const isUsername = (username) => {
  const regex = /^([а-яА-Яa-zA-Z_.+-])+$/;
  return regex.test(username);
};

const isEmail = (email) => {
  const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

const URL_POST = 'http://jsonplaceholder.typicode.com/posts';

const sendData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    body: data,
  });

  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}`);
  }

  return await response.json();
};

const sendCallBackForm = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(form);

    sendData(URL_POST, formData)
      .then(() => {
        form.reset();
        console.log('отправлено')
        username.parentElement.classList.remove('valid');
        email.parentElement.classList.remove('valid');
        country.parentElement.classList.remove('valid');
        form.querySelectorAll('.form__input-clear')
          .forEach((button) => button.style.display = 'none');
      })
      .catch((err) => console.log(err));
  })
};

sendCallBackForm();

form.querySelectorAll('.form__group .form__input-clear')
  .forEach((button) => {
    const input = button.parentElement.querySelector('input');

    input.addEventListener('input', () => {
      if (input.value.length !== 0) {
        button.style.display = 'block';
      } else {
        button.style.display = 'none';
      }

      button.addEventListener('click', (evt) => {
        evt.preventDefault();

        input.value = '';
        evt.target.parentElement.classList.remove('invalid');
        evt.target.parentElement.classList.remove('valid');
        button.style.display = 'none';
      });
    })
  });

