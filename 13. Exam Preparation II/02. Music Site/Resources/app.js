window.addEventListener('load', solve);

function solve() {
    const allHitsContainer = document.querySelector('#all-hits>.all-hits-container');
    const savedContainer = document.querySelector('#saved-hits>.saved-container');
    const [genre, name, author, date] = document.querySelectorAll('input');
    const addBtn = document.querySelector('#add-btn');
    const totalLikes = document.querySelector('#total-likes p');

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

    allHitsContainer.addEventListener('click', e => {
        if(e.target.classList.contains('like-btn')) {
            e.target.disabled = true;
            const [txt, lks] = totalLikes.textContent.split(': ');
            totalLikes.textContent = txt + ": " + (Number(lks) + 1);
        } else if(e.target.classList.contains('save-btn')) {
            const hitsInfo = e.target.parentNode;

            hitsInfo.querySelector('.save-btn').remove();
            hitsInfo.querySelector('.like-btn').remove();
            hitsInfo.querySelector('.delete-btn').remove();
            hitsInfo.innerHTML += `<button class="delete-btn">Delete</button>`;
            savedContainer.appendChild(hitsInfo);
        }
    });
}