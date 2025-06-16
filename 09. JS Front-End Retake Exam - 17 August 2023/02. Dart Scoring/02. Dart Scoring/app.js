window.addEventListener("load", solve);

function solve() {
    const addBtn = document.getElementById("add-btn");
    const player = document.getElementById("player");
    const score = document.getElementById("score");
    const round = document.getElementById("round");
    const sureList = document.getElementById("sure-list");

    addBtn.addEventListener("click", e => {
        e.preventDefault();

        if(player.value !== '' && score.value !== '' && round.value !== '') {
            sureList.innerHTML = `
                <li class="dart-item">
                    <article>
                        <p>${player.value}</p>
                        <p>Score: ${score.value}</p>
                        <p>Round: ${round.value}</p>
                    </article>
                    <button class="btn edit">edit</button>
                    <button class="btn ok">ok</button> 
                </li>
            `;

            player.value = '';
            score.value = '';
            round.value = '';
            addBtn.disabled = true;
        }
    });
}
  