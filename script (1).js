function changeStatus(button) {
    const td = button.parentElement.previousElementSibling;
    const currentStatus = td.dataset.status;
    const newStatus = currentStatus === 'Paid' ? 'Pending' : 'Paid';
    td.textContent = newStatus;
    td.dataset.status = newStatus;

    if (newStatus === 'Paid') {
        button.className = 'payment-button pending';
        button.textContent = 'Pending';
    } else {
        button.className = 'payment-button paid';
        button.textContent = 'Paid';
    }
    updateTotalBalance();
}

function editRow(button) {
    const row = button.parentElement.parentElement;
    row.classList.add('edit-row');
    const cells = row.querySelectorAll('td:not(:last-child)');
    cells.forEach(cell => {
        const text = cell.textContent;
        cell.innerHTML = `<input type="text" class="edit-input" value="${text}">`;
    });
    button.textContent = 'Save';
    button.onclick = saveRow;
}

function saveRow(button) {
    const row = button.parentElement.parentElement;
    row.classList.remove('edit-row');
    const cells = row.querySelectorAll('td:not(:last-child)');
    cells.forEach(cell => {
        const input = cell.querySelector('input');
        cell.textContent = input.value;
    });
    button.textContent = 'Edit';
    // Re-attach the editRow function to the button:
    button.onclick = function() { editRow(button); };
    updateTotalBalance();
}

function addRow() {
    const table = document.getElementById('customerTable').querySelector('tbody');
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td class="name"><input type="text" class="edit-input" placeholder="Name"></td>
        <td class="products"><input type="text" class="edit-input" placeholder="Products"></td>
        <td class="balance"><input type="text" class="edit-input" placeholder="Balance"></td>
        <td class="total-amount"><input type="text" class="edit-input" placeholder="Total"></td>
        <td class="due-date"><input type="text" class="edit-input" placeholder="Due Date"></td>
        <td class="status" data-status="Pending">Pending</td>
        <td><button class="payment-button pending" onclick="changeStatus(this)">Pending</button> <button onclick="editRow(this)">Edit</button></td>
    `;
    updateTotalBalance();
}

function updateTotalBalance() {
    let total = 0;
    const balanceCells = document.querySelectorAll('#customerTable .balance');
    balanceCells.forEach(cell => {
        total += parseFloat(cell.textContent) || 0;
    });
    document.getElementById('totalBalance').textContent = `Total Outstanding Balance: ₱ ${total}`;
}

updateTotalBalance();

//Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const container = document.getElementById('container');

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    container.classList.toggle('dark-mode');
    darkModeToggle.classList.toggle('dark-mode');
});