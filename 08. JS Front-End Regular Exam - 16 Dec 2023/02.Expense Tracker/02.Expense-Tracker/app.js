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

    previewList.addEventListener("click", e => {
        if(e.target.classList.contains("edit")) {
            const li = e.target.parentNode.parentNode;
            const [pExpense, pAmount, pDate] = li.querySelectorAll("article>p");

            expense.value = pExpense.textContent.split(": ")[1];
            amount.value = pAmount.textContent.split(": ")[1].split("$")[0];
            date.value = pDate.textContent.split(": ")[1];
            li.remove();
            addBtn.disabled = false;
        }
    })
}