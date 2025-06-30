window.addEventListener('load', solve);

function solve() {
    const allHitsContainer = document.querySelector('#all-hits>.all-hits-container');
    const [genre, name, author, date] = document.querySelectorAll('input');
    const addBtn = document.querySelector('#add-btn');

    addBtn.addEventListener('click', e => {
        e.preventDefault();

        if(genre.value !== '' && name.value !== '' && author.value !== '' && date.value !== '') {
            allHitsContainer.innerHTML += `<div class="hits-info">
            <h2>Genre: ${genre.value}</h2>
            <h2>Name: ${name.value}</h2>
            <h2>Author: ${author.value}</h2>
            <h3>Date: ${date.value}</h3>
            <button class="save-btn">Save song</button>
            <button class="like-btn">Like song</button>
            <button class="delete-btn">Delete</button>
</div>`;
            genre.value = '';
            name.value = '';
            author.value = '';
            date.value = '';
        }
    });
}