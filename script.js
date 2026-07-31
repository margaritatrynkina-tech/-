// Элементы
const mainPage = document.getElementById('mainPage');
const formPage = document.getElementById('formPage');
const successPage = document.getElementById('successPage');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const dateForm = document.getElementById('dateForm');

// Позиция кнопки "Нет"
let noBtnRect = noBtn.getBoundingClientRect();
let isMoving = false;

// Отслеживание движения мыши для кнопки "Нет"
document.addEventListener('mousemove', (e) => {
    moveButtonAway(e.clientX, e.clientY);
});

// Для мобильных устройств (касание)
document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    moveButtonAway(touch.clientX, touch.clientY);
});

function moveButtonAway(mouseX, mouseY) {
    const noBtn = document.getElementById('noBtn');
    const rect = noBtn.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    // Расстояние от курсора до центра кнопки
    const distance = Math.sqrt(
        Math.pow(mouseX - buttonCenterX, 2) +
        Math.pow(mouseY - buttonCenterY, 2)
    );

    // Если курсор ближе 150px - кнопка убегает
    if (distance < 150 && distance > 0) {
        // Направление движения (от курсора)
        const angle = Math.atan2(buttonCenterY - mouseY, buttonCenterX - mouseX);
        const velocity = 200; // Скорость движения

        let newX = rect.left + Math.cos(angle) * velocity;
        let newY = rect.top + Math.sin(angle) * velocity;

        // Ограничения экрана
        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        // Применяем новую позицию
        noBtn.style.position = 'fixed';
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
        noBtn.style.right = 'auto';
    }
}

// Клик на "Да"
yesBtn.addEventListener('click', () => {
    // Эффект конфетти
    createConfetti();

    // Плавный переход к форме
    mainPage.style.transition = 'opacity 0.5s';
    mainPage.style.opacity = '0';

    setTimeout(() => {
        mainPage.classList.add('hidden');
        formPage.classList.remove('hidden');
        formPage.style.animation = 'fadeInDown 0.5s ease';
    }, 500);
});

// Отправка формы
dateForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(dateForm);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('save.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            // Показываем страницу успеха
            formPage.classList.add('hidden');
            successPage.classList.remove('hidden');
            successPage.style.animation = 'fadeInDown 0.5s ease';

            // Конфетти
            createConfetti();
        } else {
            alert('Произошла ошибка. Попробуй ещё раз! 💕');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Что-то пошло не так. Но я всё равно жду встречи! ❤️');
    }
});

// Эффект конфетти
function createConfetti() {
    const colors = ['#f093fb', '#f5576c', '#667eea', '#764ba2', '#ffd700'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';

        document.body.appendChild(confetti);

        const duration = Math.random() * 3 + 2;
        const horizontalMovement = (Math.random() - 0.5) * 200;

        confetti.animate([
            { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(100vh) translateX(${horizontalMovement}px) rotate(720deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => confetti.remove();
    }
}

// Пасхалка - если кто-то пытается кликнуть на "Нет" через консоль
noBtn.addEventListener('click', () => {
    alert('Я же сказал, что кнопка убежит! 😄 Ты всё равно не сможешь отказаться!');
    moveButtonAway(window.innerWidth / 2, window.innerHeight / 2);
});