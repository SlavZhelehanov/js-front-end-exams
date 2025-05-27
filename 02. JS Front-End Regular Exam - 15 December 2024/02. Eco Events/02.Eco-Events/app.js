window.addEventListener("load", solve);

function solve() {
    const email = document.getElementById("email");
    const event = document.getElementById("event");
    const location = document.getElementById("location");
    const nextBtn = document.getElementById("next-btn");
    const previewList = document.getElementById("preview-list");

    nextBtn.addEventListener("click", e => {
        e.preventDefault();

        if (email.value != '' && event.value != '' && location.value != '') {
            previewList.innerHTML = `<li class="application">
                <article>
                    <h4>${email.value}</h4>
                    <p>
                        <strong>Event:</strong>
                        <br>
                        ${event.value}
                    </p>
                    <p>
                        <strong>Location:</strong>
                        <br>
                        ${location.value}
                    </p>
                </article>
                <button class="action-btn edit">edit</button>
                <button class="action-btn apply">apply</button>
            </li>`;

            nextBtn.disabled = true;
            email.value = '';
            event.value = '';
            location.value = '';
        }
    });

    previewList.addEventListener("click", e => {
        if (e.target.classList.contains("edit")) {
            const li = e.target.parentElement;
            email.value = li.querySelector("h4").textContent;
            event.value = li.querySelectorAll("p")[0].textContent.split("\n").filter(f => f.trim() != '')[1].trim();
            location.value = li.querySelectorAll("p")[1].textContent.split("\n").filter(f => f.trim() != '')[1].trim();            

            previewList.innerHTML = '';
            nextBtn.disabled = false;
        } //else if (e.target.classList.contains("apply")) {
        //     const li = e.target.parentElement;
        //     li.querySelector(".edit").remove();
        //     li.querySelector(".apply").remove();
        //     document.getElementById("application").appendChild(li);
        // }
    })
}
