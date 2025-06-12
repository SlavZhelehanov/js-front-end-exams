window.addEventListener("load", solve);

function solve() {
    const [expense, amount, date] = document.querySelectorAll("input");
    const addBtn = document.getElementById("add-btn");
    const previewList = document.getElementById("preview-list");

    addBtn.addEventListener("click", e => {
        e.preventDefault();

        if(expense.value !== '' && amount.value !== '' && date.value !== '') {
            previewList.innerHTML += `
                <li class="expense-item">
                    <article>
                        <p>Type: ${expense.value}</p>
                        <p>Amount: ${amount.value}$</p>
                        <p>Date: ${date.value}</p>
                    </article>
                    <div class="buttons">
                        <button class="btn edit">edit</button>
                        <button class="btn ok">ok</button>
                    </div>
                </li>    
            `;

            expense.value = '';
            amount.value = '';
            date.value = '';
            addBtn.disabled = true;
        }
    });
}