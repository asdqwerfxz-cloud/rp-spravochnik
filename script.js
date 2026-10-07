// Копирование текста отыгровки
function copyText(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => alert("Отыгровка скопирована в буфер обмена!"))
    .catch((err) => console.error("Ошибка копирования: ", err));
}

// Открытие модального окна категорий
function openCategoriesModal() {
  const modal = document.getElementById("categoriesModal");
  if (modal) {
    modal.style.display = "flex";
    modal.style.pointerEvents = "auto";
  }
}

// Закрытие модального окна категорий
function closeCategoriesModal() {
  const modal = document.getElementById("categoriesModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Переключение (разворачивание/сворачивание) полочек
function toggleCategory(listId) {
  const list = document.getElementById(listId);
  if (!list) return;

  const computedStyle = window.getComputedStyle(list).display;
  if (computedStyle === "none" || computedStyle === "") {
    list.style.display = "block";
  } else {
    list.style.display = "none";
  }
}

// Фильтрация статей по категориям
function filterCategory(category) {
  const cards = document.querySelectorAll(".card");
  const allHeadings = document.querySelectorAll(
    ".chapter-title, .section-divider, h3, h4",
  );
  const searchInput = document.getElementById("searchInput");

  // Сбрасываем поле поиска при клике на категорию
  if (searchInput) {
    searchInput.value = "";
  }

  // Если выбрано «Все статьи»
  if (category === "all") {
    allHeadings.forEach((item) => (item.style.display = "block"));
    cards.forEach((card) => (card.style.display = "block"));
  } else {
    // Скрываем общие заголовки, показываем только нужные карточки
    allHeadings.forEach((item) => (item.style.display = "none"));

    cards.forEach((card) => {
      const cardCat = card.getAttribute("data-category") || "";
      if (cardCat === category || cardCat.startsWith(category + "-")) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  closeCategoriesModal();
}

// Живой поиск по статьям
function searchArticles() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  const query = searchInput.value.toLowerCase().trim();
  const cards = document.querySelectorAll(".card");
  const allHeadings = document.querySelectorAll(
    ".chapter-title, .section-divider, h3, h4",
  );
  const searchTerms = query.split(/\s+/).filter((term) => term.length > 0);

  // Если поиск пустой — возвращаем всё как было
  if (searchTerms.length === 0) {
    cards.forEach((card) => (card.style.display = "block"));
    allHeadings.forEach((item) => (item.style.display = "block"));
    return;
  }

  // При поиске скрываем заголовки глав
  allHeadings.forEach((item) => (item.style.display = "none"));

  cards.forEach((card) => {
    const keywords = (card.getAttribute("data-keywords") || "").toLowerCase();
    const text = card.textContent.toLowerCase();
    const combined = keywords + " " + text;

    const matchesAll = searchTerms.every((term) => combined.includes(term));

    if (matchesAll) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Закрытие модалки по клику на фон
window.addEventListener("click", function (event) {
  const modal = document.getElementById("categoriesModal");
  if (event.target === modal) {
    closeCategoriesModal();
  }
});
