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
        <div class= "edit-buttons">
            <button class="edit-btn"><i class="fa-solid fa-pen"> </i> </button>
            <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
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