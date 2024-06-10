class Item {
    constructor(id, name, valor) {
        this.id = id;
        this.name = name;
        this.valor = valor;
    }
}

class CRUD {
    constructor() {
        this.form = document.getElementById("crud-form");
        this.nameInput = document.getElementById("name");
        this.valorInput = document.getElementById("valor");
        this.idInput = document.getElementById("id");
        this.tableBody = document.getElementById("crud-table-body");
        this.loadItems();
        this.form.addEventListener('submit', (e) => this.saveItem(e));
    }

    loadItems() {
        const itemJSON = localStorage.getItem('items');
        let items = [];
        if (itemJSON) {
            try {
                items = JSON.parse(itemJSON);
            } catch (e) {
                console.log("Error parsing JSON from localStorage: ", e);
                items = [];
            }
        }

        this.tableBody.innerHTML = '';
        items.forEach(item => {
            const { id, name, valor } = item;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${name}</td>
                <td>${valor}</td>
                <td>
                    <button class="update" onclick="crud.editItem(${id})">Actualizar</button>
                    <button class="delete" onclick="crud.deleteItem(${id})">Eliminar</button>
                </td>
            `;
            this.tableBody.appendChild(row);
        });
    }

    saveItems(items) {
        localStorage.setItem('items', JSON.stringify(items));
        this.loadItems();
    }

    saveItem(e) {
        e.preventDefault();
        const name = this.nameInput.value.trim();
        const valor = this.valorInput.value.trim();
        const id = this.idInput.value;
        const items = JSON.parse(localStorage.getItem('items')) || [];
        if (id === '') {
            const newItem = new Item(Date.now(), name, valor);
            items.push(newItem);
        } else {
            const index = items.findIndex(item => item.id == id);
            items[index].name = name;
            items[index].valor = valor;
        }
        this.saveItems(items);
        this.form.reset();
    }

    editItem(id) {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        const item = items.find(item => item.id == id);
        this.nameInput.value = item.name;
        this.valorInput.value = item.valor;
        this.idInput.value = item.id;
    }

    deleteItem(id) {
        let items = JSON.parse(localStorage.getItem('items')) || [];
        items = items.filter(item => item.id != id);
        this.saveItems(items);
    }
}

const crud = new CRUD();