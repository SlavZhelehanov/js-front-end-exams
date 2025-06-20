window.addEventListener("load", solve);

function solve() {
    const taskTitle = document.getElementById("task-title");
    const taskCategory = document.getElementById("task-category");
    const taskContent = document.getElementById("task-content");
    const publishBtn = document.getElementById("publish-btn");
    const reviewList = document.getElementById("review-list");

    publishBtn.addEventListener("click", e => {
        e.preventDefault();

        if(taskTitle.value !== '' && taskCategory.value !== '' && taskContent.value !== '') {
            reviewList.innerHTML += `
                <li class="rpost">
                    <article>
                        <h4>${taskTitle.value}</h4>
                        <p>Category: ${taskCategory.value}</p>
                        <p>Content: ${taskContent.value}</p>
                    </article>  
                    <button class="action-btn edit">Edit</button>
                    <button class="action-btn post">Post</button>
                </li>`;

            taskTitle.value = '';
            taskCategory.value = '';
            taskContent.value = '';
        }
    });

    reviewList.addEventListener("click", e => {
        if(e.target.classList.contains("edit")) {
            const li = e.target.parentNode;
            const pTitle = li.querySelector("h4").textContent;
            const [pCategory, pContent] = li.querySelectorAll("article>p");

            taskTitle.value = pTitle;
            taskCategory.value = pCategory.textContent.split(": ")[1];
            taskContent.value = pContent.textContent.split(": ")[1];
            li.remove();
        }
    });
}