document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const addBtn = document.getElementById('add-btn');
    const list = document.getElementById('list');

    const addItem = (text, completed = false) => {
        text = text || input.value.trim();
        if (!text) {
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}/>
            <span>${text}</span>
            <div class="edit-buttons">
                <button class="edit-btn"><i class="fa-solid fa-pen"> </i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        const checkbox = li.querySelector('.checkbox');
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
        });

        editBtn.addEventListener('click', () => {
            if (!checkbox.checked) {
                input.value = li.querySelector('span').textContent;
            }
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
        });

        list.appendChild(li);
        input.value = '';
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
});