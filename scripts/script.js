const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const editPopup = document.querySelector(".popup_edit-profile");
const editButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescr = document.querySelector(".profile__description");
const popupFirstName = document.querySelector(".popup__input_firstname");
const popupDescr = document.querySelector(".popup__input_description");
const formEdit = document.querySelector(".popup_form-edit");

const addPlaceCard = document.querySelector(".popup_add-card");
const formAdd = document.querySelector(".popup_form-add");
const cardName = document.querySelector(".popup__input_card-name");
const cardLink = document.querySelector(".popup__input_link");
const addButton = document.querySelector(".profile__add-button");

const popups = document.querySelectorAll(".popup");

const closeBtns = document.querySelectorAll(".popup__close-button");

const cardContainer = document.querySelector(".elements__items");
const cardTemplate = document.querySelector("#card").content;
const cardsList = document.querySelector(".elements__item");

const popupImageContainer = document.querySelector(".popup_image");
const popupImage = document.querySelector(".popup__img");
const popupCaption = document.querySelector(".popup__caption");

//--- открытие popup
function openPopup(popups) {
  popups.classList.add("popup_opened");
}
//--- закрытие popup
function closePopup(popups) {
  popups.classList.remove("popup_opened");
}

function closeModal(e) {
  if (
    e.target.classList.contains("popup__close-button") ||
    e.target.classList.contains("popup")
  ) {
    closePopup(e.target.closest(".popup"));
  }
}

addButton.addEventListener("click", () => {
  openPopup(addPlaceCard);
});

editButton.addEventListener("click", function () {
  openPopup(editPopup);
  popupFirstName.value = profileTitle.textContent;
  popupDescr.value = profileDescr.textContent;
});

closeBtns.forEach((closeButton) => {
  closeButton.addEventListener("click", closeModal);
});

//--- Обработчик формы
function handleProfileFormSubmit(e) {
  e.preventDefault();

  profileTitle.textContent = popupFirstName.value;
  profileDescr.textContent = popupDescr.value;

  closePopup(editPopup);
}

formEdit.addEventListener("submit", handleProfileFormSubmit);

//---Добавление карточек

function addCard(imgValue, titleValue) {
  const cardTemplateElement = createCard(imgValue, titleValue);
  cardContainer.prepend(cardTemplateElement);
}

function createCard(imgValue, titleValue) {
  const cardTemplateElement = cardTemplate.cloneNode(true);

  const photo = cardTemplateElement.querySelector(".elements__image");
  const title = cardTemplateElement.querySelector(".elements__title");

  photo.src = imgValue;
  title.textContent = titleValue;
  photo.alt = titleValue;

  cardTemplateElement
    .querySelector(".elements__like-button")
    .addEventListener("click", function (e) {
      e.target.classList.toggle("elements__like-button_active");
    });

  cardTemplateElement
    .querySelector(".elements__delete-button")
    .addEventListener("click", function (e) {
      const deleteCardItem = e.target.closest(".elements__item");
      deleteCardItem.remove();
    });

  photo.addEventListener("click", function () {
    openPopup(popupImageContainer);
    popupImage.src = imgValue;
    popupImage.alt = titleValue;
    popupCaption.textContent = titleValue;
  });

  return cardTemplateElement;
}

function handleFormPlace(e) {
  e.preventDefault();
  const imgValue = cardLink.value;
  const titleValue = cardName.value;
  addCard(imgValue, titleValue);
  closePopup(addPlaceCard);
  formAdd.reset();
}

formAdd.addEventListener("submit", handleFormPlace);

//---Исходные карточки

initialCards.forEach(function (initialCards) {
  addCard(initialCards.link, initialCards.name);
});
