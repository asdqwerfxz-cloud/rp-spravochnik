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
    const chapterTitles = document.querySelectorAll('.chapter-title');
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = ''; // Сбрасываем поисковый ввод

    // При выборе категории показываем заголовки глав
    chapterTitles.forEach(title => title.style.display = 'block');

    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    closeCategoriesModal();
}

// Поиск по ключевым словам с автоскрытием пустых глав
function searchArticles() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const cards = document.querySelectorAll('.card');
    const chapterTitles = document.querySelectorAll('.chapter-title');
    const searchTerms = query.split(/\s+/).filter(term => term.length > 0);

    // Если строка поиска пуста — возвращаем всё на место
    if (searchTerms.length === 0) {
        cards.forEach(card => card.style.display = 'block');
        chapterTitles.forEach(title => title.style.display = 'block');
        return;
    }

    // Во время поиска скрываем все заголовки глав, чтобы они не мешали сверху
    chapterTitles.forEach(title => title.style.display = 'none');

    cards.forEach(card => {
        const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
        const text = card.textContent.toLowerCase();
        const combinedContent = keywords + " " + text;

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