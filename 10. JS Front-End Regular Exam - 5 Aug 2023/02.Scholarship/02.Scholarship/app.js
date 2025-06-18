window.addEventListener("load", solve);

function solve() {
    const nextBtn = document.getElementById("next-btn");
    const previewList = document.getElementById("preview-list");
    const candidatesList = document.getElementById("candidates-list");
    const [student, university, score] = document.querySelectorAll("input");

    nextBtn.addEventListener("click", e => {
        e.preventDefault();

        if(student.value !== '' && university.value !== '' && score.value !== '') {
            previewList.innerHTML = `
                <li class="application">
                    <article>
                        <h4>${student.value}</h4>
                        <p>University: ${university.value}</p>
                        <p>Score: ${score.value}</p>
                    </article>
                    <button class="action-btn edit">edit</button>
                    <button class="action-btn apply">apply</button>  
                </li>
            `;

            student.value = '';
            university.value = '';
            score.value = '';
            nextBtn.disabled = true;
        }
    });

    previewList.addEventListener("click", e => {
        if(e.target.classList.contains("edit")) {
            const li = e.target.parentNode;
            const pStudent = li.querySelector("h4").textContent;
            const [pUniversity, pScore] = li.querySelectorAll("article>p");

            student.value = pStudent;
            university.value = pUniversity.textContent.split(": ")[1];
            score.value = pScore.textContent.split(": ")[1];
            li.remove();
            nextBtn.disabled = false;
        }
    })
}
  