document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const addBtn = document.getElementById('add-btn');
    const list = document.getElementById('list');

    const Confetti = () => {
        const duration = 5 * 1000, 
            animationEnd = Date.now() + duration;

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        (function frame() {
            const timeLeft = animationEnd - Date.now(),
                ticks = Math.max(200, 500 * (timeLeft / duration));

            confetti({
                particleCount: 1,
                startVelocity: 0,
                ticks: ticks,
                origin: {
                    x: Math.random(),
                    y: Math.random() * 0.8 - 0.2,
                },
                colors: ["#ffffff"],
                shapes: ["circle"],
                gravity: randomInRange(0.4, 0.6),
                scalar: randomInRange(0.4, 1),
                drift: randomInRange(-0.4, 0.4),
            });

            if (timeLeft > 0) {
                requestAnimationFrame(frame);
            }
        })();
    };

    const completedProgress = () => {
        const totalItems = list.querySelectorAll('.checkbox').length;
        const checkedItems = list.querySelectorAll('.checkbox:checked').length;

        if (totalItems > 0 && checkedItems === totalItems) {
            Confetti();
        }
    };

    const saveItemToLocalStorage = () => {
        const items = Array.from(list.querySelectorAll('li')).map(li => ({
            text: li.querySelector('.task-text').textContent,
            completed: li.querySelector('.checkbox').checked
        }));

        localStorage.setItem('items', JSON.stringify(items));
    };

    const loadItemsFromLocalStorage = () => {
        const savedItems = JSON.parse(localStorage.getItem('items')) || [];
        savedItems.forEach(({ text, completed }) => addItem(text, completed));
    };

    const addItem = (text, completed = false) => {
        text = text || input.value.trim();
        if (!text) return;

        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}/>
            <span class="task-text">${text}</span>
            <div class="edit-buttons">
                <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        const checkbox = li.querySelector('.checkbox');
        const taskText = li.querySelector('.task-text');
        const editBtn = li.querySelector('.edit-btn');

        if (completed) {
            li.classList.add('completed');
            editBtn.disabled = true;
            editBtn.style.opacity = '0.5';
            editBtn.style.pointerEvents = 'none';
        }

        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked);
            editBtn.disabled = isChecked;
            editBtn.style.opacity = isChecked ? '0.5' : '1';
            editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
            saveItemToLocalStorage();
            completedProgress();
        });

        editBtn.addEventListener('click', () => {
            if (!checkbox.checked) {
                const inputField = document.createElement('input');
                inputField.type = 'text';
                inputField.value = taskText.textContent;
                inputField.classList.add('edit-input');

                li.replaceChild(inputField, taskText);
                inputField.focus();

                inputField.addEventListener('blur', saveEdit);
                inputField.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        saveEdit();
                    }
                });

                function saveEdit() {
                    taskText.textContent = inputField.value.trim() || text;
                    li.replaceChild(taskText, inputField);
                    saveItemToLocalStorage();
                }
            }
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            saveItemToLocalStorage();
            completedProgress();
        });

        list.appendChild(li);
        input.value = '';
        saveItemToLocalStorage(); 
    };

    addBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addItem();
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addItem();
        }
    });

    loadItemsFromLocalStorage();
});
