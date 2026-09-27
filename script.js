// Копирование текста отыгровки
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Отыгровка скопирована в буфер обмена!');
    }).catch(err => {
        console.error('Ошибка копирования: ', err);
    });
}

// Открытие и закрытие модального окна категорий
function openCategoriesModal() {
    const modal = document.getElementById('categoriesModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeCategoriesModal() {
    const modal = document.getElementById('categoriesModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Переключение (разворачивание) списков внутри модалки
function toggleCategory(listId) {
    const list = document.getElementById(listId);
    if (list) {
        const isVisible = list.style.display === 'block';
        list.style.display = isVisible ? 'none' : 'block';
    }
}

// Фильтрация статей по категории из модалки
function filterCategory(category) {
    const cards = document.querySelectorAll('.card');
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = ''; // Сбрасываем поисковый ввод

    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }В
    });

    closeCategoriesModal();
}

// Поиск по ключевым словам без подпрыгивания и сброса позиции страницы
function searchArticles() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const cards = document.querySelectorAll('.card');
    const searchTerms = query.split(/\s+/).filter(term => term.length > 0);

    cards.forEach(card => {
        const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
        const text = card.textContent.toLowerCase();
        const combinedContent = keywords + " " + text;

        // Если строка поиска пуста — показываем все карточки
        if (searchTerms.length === 0) {
            card.style.display = 'block';
            return;
        }

        // Проверяем соответствие поисковым словам
        const matchesAll = searchTerms.every(term => combinedContent.includes(term));

        if (matchesAll) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Закрытие модального окна при клике вне его области
window.onclick = function(event) {
    const modal = document.getElementById('categoriesModal');
    if (event.target === modal) {
        closeCategoriesModal();
    }
};