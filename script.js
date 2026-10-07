// Копирование текста отыгровки
function copyText(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Отыгровка скопирована в буфер обмена!");
    })
    .catch((err) => {
      console.error("Ошибка копирования: ", err);
    });
}

// Открытие и закрытие модального окна категорий
function openCategoriesModal() {
  const modal = document.getElementById("categoriesModal");
  if (modal) {
    modal.style.display = "flex";
    modal.style.pointerEvents = "auto";
  }
}

function closeCategoriesModal() {
  const modal = document.getElementById("categoriesModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Переключение (разворачивание) списков внутри модалки
function toggleCategory(listId) {
  const list = document.getElementById(listId);
  if (!list) return;

  const currentDisplay = window.getComputedStyle(list).display;
  if (currentDisplay === "none" || currentDisplay === "") {
    list.style.display = "block";
  } else {
    list.style.display = "none";
  }
}

// Фильтрация статей по категории из модалки
function filterCategory(category) {
  const cards = document.querySelectorAll(".card");
  const allHeadings = document.querySelectorAll(
    ".chapter-title, .section-divider, h3, h4",
  );
  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.value = ""; // сбрасываем поисковый ввод

  // Если выбраны «Все статьи» — возвращаем заголовки обратно, иначе скрываем их
  if (category === "all") {
    allHeadings.forEach((item) => (item.style.display = "block"));
  } else {
    allHeadings.forEach((item) => (item.style.display = "none"));
  }

  cards.forEach((card) => {
    const cardCat = card.getAttribute("data-category") || "";
    if (
      category === "all" ||
      cardCat === category ||
      cardCat.startsWith(category + "-")
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  closeCategoriesModal();
}

// Универсальный поиск с автокрытием всех глав и заголовков
function searchArticles() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  const query = searchInput.value.toLowerCase().trim();
  const cards = document.querySelectorAll(".card");
  const allHeadings = document.querySelectorAll(
    ".chapter-title, .section-divider, h3, h4",
  );
  const searchTerms = query.split(/\s+/).filter((term) => term.length > 0);

  // Если строка поиска пуста — возвращаем всё на место
  if (searchTerms.length === 0) {
    cards.forEach((card) => (card.style.display = "block"));
    allHeadings.forEach((item) => (item.style.display = "block"));
    return;
  }

  // Во время поиска скрываем вообще все заголовки глав
  allHeadings.forEach((item) => (item.style.display = "none"));

  cards.forEach((card) => {
    const keywords = (card.getAttribute("data-keywords") || "").toLowerCase();
    const text = card.textContent.toLowerCase();
    const combinedContent = keywords + " " + text;

    const matchesAll = searchTerms.every((term) =>
      combinedContent.includes(term),
    );

    if (matchesAll) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Закрытие модального окна при клике вне его области
window.onclick = function (event) {
  const modal = document.getElementById("categoriesModal");
  if (event.target === modal) {
    closeCategoriesModal();
  }
};
