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

    let firstNameValue, lastNameValue, ageValue, storyTitleValue, genreValue, storyValue;

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
            firstNameValue = firstName.value;
            lastNameValue = lastName.value;
            genreValue = genre.value;
            storyValue = story.value;
            storyTitleValue = storyTitle.value;
            ageValue = age.value;

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
            firstName.value = firstNameValue;
            lastName.value = lastNameValue;
            genre.value = genreValue;
            story.value = storyValue;
            storyTitle.value = storyTitleValue;
            age.value = ageValue;
            formBtn.disabled = false;
            e.target.parentNode.remove();
        } else if (e.target.classList.contains("delete-btn")) {
            e.target.parentNode.remove();
            formBtn.disabled = false;
        } else if (e.target.classList.contains("save-btn")) main.innerHTML = "<h1>Your scary story is saved!</h1>"
    });
}