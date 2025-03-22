document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const addBtn = document.getElementById('add-btn') 
    const list = document.getElementById('list')

    const addItem = (event) => {
        const text = input.ariaValueMax.trim();
        if(!text) {
            return;
        }

        const li =document.createElement('li');
        li.textContent = text;
        list.appendChild(li);
        input.value = '';
    }
});