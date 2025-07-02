window.addEventListener("load", solve);

function solve() {
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const age = document.getElementById("age");
    const storyTitle = document.getElementById("story-title");
    const genre = document.getElementById("genre");
    const story = document.getElementById("story");
    const formBtn = document.getElementById("form-btn");
    const previewList = document.getElementById("preview-list");
    const main = document.getElementById("main");

    formBtn.addEventListener("click", e => {
        e.preventDefault();

        if (firstName.value !== '' && lastName.value !== '' && age.value !== '' && storyTitle.value !== '' && genre.value !== '' && story.value !== '') {
            previewList.innerHTML += `<li class="story-info">
<article>
<h4>Name: ${firstName.value} ${lastName.value}</h4>
<p>Age: ${age.value}</p>
<p>Title: ${storyTitle.value}</p>
<p>Genre: ${genre.value}</p>
<p>${story.value}</p>
</article>
<button class="save-btn">Save Story</button>
<button class="edit-btn">Edit Story</button>
<button class="delete-btn">Delete Story</button>
</li>`;
            firstName.value = '';
            lastName.value = '';
            genre.value = '';
            story.value = '';
            storyTitle.value = '';
            age.value = '';
            formBtn.disabled = true;
        }
    });

    previewList.addEventListener("click", e => {
        e.preventDefault();

        if (e.target.classList.contains("edit-btn")) {
            const li = e.target.parentNode;
            const [_, h4FirstName, h4LastName] = li.childNodes[1].childNodes[1].textContent.trim().split(' ');
            const pAge = li.childNodes[1].childNodes[3].textContent.trim().split(' ')[1];
            const pStoryTitle = li.childNodes[1].childNodes[5].textContent.trim().split(' ')[1];
            const pGenre =  li.childNodes[1].childNodes[7].textContent.trim().split(' ')[1];
            const pStory = li.childNodes[1].childNodes[9].textContent.trim();

            firstName.value = h4FirstName;
            lastName.value = h4LastName;
            genre.value = pGenre;
            story.value = pStory;
            storyTitle.value = pStoryTitle;
            age.value = pAge;
            formBtn.disabled = false;
            li.remove();
        } else if (e.target.classList.contains("delete-btn")) {
            e.target.parentNode.remove();
            formBtn.disabled = false;
        } else if (e.target.classList.contains("save-btn")) main.innerHTML = "<h1>Your scary story is saved!</h1>"
    });
}
