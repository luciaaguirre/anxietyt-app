document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const addBtn = document.getElementById('add-btn') 
    const list = document.getElementById('list')

    const addItem = (event) => {
        event.preventDefault();
        const text = input.value.trim(  );
        if(!text) {
            return;
        }

        const li =document.createElement('li');
        li.innerHTML = `
        <input type = "checkbox" class= "checkbox">
        <span>${text}</span>
        `;

        // li.textContent = text;
        list.appendChild(li);
        input.value = '';
    }

    addBtn.addEventListener('click',addItem);
    input.addEventListener('keypress', (e) => {
        if(e.key === 'Enter'){
            addItem(e);
        }
    })
});