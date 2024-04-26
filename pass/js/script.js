const classesList = document.getElementById('classes-list');
const classItemsContainer = document.getElementById('class-items-container');

classesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('class-link')) {
        const classId = e.target.dataset.class;
        const classItems = getClassItems(classId);
        const clickedClass = e.target.parentElement;
        const nextClass = clickedClass.nextElementSibling;

        // Удаляем все предыдущие контейнеры с темами
        const existingTopicContainers = document.querySelectorAll('.class-items-wrapper');
        existingTopicContainers.forEach(container => container.remove());

        // Создаем контейнер для предметов класса
        const classItemsWrapper = document.createElement('div');
        classItemsWrapper.classList.add('class-items-wrapper');
        classItemsWrapper.innerHTML = '<div id="class-items-container"></div>';

        // Вставляем контейнер перед следующим классом
        nextClass.parentNode.insertBefore(classItemsWrapper, nextClass);

        // Находим только что созданный контейнер
        const newClassItemsContainer = classItemsWrapper.querySelector('#class-items-container');

        // Заполняем его предметами класса
        classItems.forEach((item) => {
            const itemElement = document.createElement('ul');
            itemElement.innerHTML = `<li>${item.name}</li>`;
            itemElement.addEventListener('click', (e) => {
                e.stopPropagation(); // Предотвращаем всплытие события до родительских элементов
                const topicsList = document.createElement('ul');
                topicsList.classList.add('topics-list');
                item.topics.forEach((topic) => {
                    const topicElement = document.createElement('li');
                    topicElement.innerHTML = `<a href="html\sait.html?topicId=${topic.id}" class="topic-link" data-topic="${topic.id}">${topic.name}</a>`;
                    topicsList.appendChild(topicElement);
                });
                // Проверяем, есть ли уже список тем в контейнере, иначе добавляем
                const existingTopicsList = itemElement.querySelector('.topics-list');
                if (existingTopicsList) {
                    existingTopicsList.remove();
                } else {
                    itemElement.appendChild(topicsList);
                }
            });
            newClassItemsContainer.appendChild(itemElement);
        });
    }
});

function getClassItems(classId) {
    const classItems = [
        {
            id: 1,
            name: 'Математика',
            topics: [
                { id: 1, name: 'Двузначные числа' },
                { id: 2, name: 'Topic 2' },
                { id: 3, name: 'Topic 3' },
            ],
        },
        {
            id: 2,
            name: 'История',
            topics: [
                { id: 4, name: 'Topic 4' },
                { id: 5, name: 'Topic 5' },
                { id: 6, name: 'Topic 6' },
            ],
        },
        {
            id: 3,
            name: 'Руский язык',
            topics: [
                { id: 7, name: 'Topic 7' },
                { id: 8, name: 'Topic 8' },
                { id: 9, name: 'Topic 9' },
            ],
        },
    ];
    return classItems;
}
