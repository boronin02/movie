const inputNode = document.querySelector('.js-input');
const movieListNode = document.querySelector('.movie-list');

const containerNode = document.querySelector('.container');


document.querySelector('.js-button').addEventListener('click', function() {
    const id = inputNode.value;

    fetch(`https://www.omdbapi.com/?s=${id}&apikey=fcb41531`)
    .then(response => response.json())
    .then(res => {
        if (!res.Search) {
            movieListNode.innerHTML = `<p>Фильмы не найдены</p>`;
            return;
        }

        const movies = res.Search;

        movieListNode.innerHTML = movies.map(movie => `
            <div class="movie-item">
            <div class="row-movie">
                <div class="col">
                    <img
                        class="img-poster"
                        src="${movie.Poster}">
                </div>
                <div class="col col-2">
                    <p class="Title-text">${movie.Title}</p>
                    <p class="Year-text">${movie.Year}</p>
                    <p class="Type-text">${movie.Type}</p>
                </div>
            </div>
        </div>
        `).join('');
    })
});

movieListNode.addEventListener('click', function(event, id) {
    if (event.target.closest('.movie-item')) {
        fetch(`https://www.omdbapi.com/?s=${id}&apikey=fcb41531`)
        .then(response => response.json())
        .then(movie => {
            
            containerNode.innerHTML += `
            <div class="js-popup popup">
                <div class="popup__content">         
                    <div class="row-movie">
                        <div class="col">
                            <img
                                class="img-poster"
                                src="${movie.Poster}">
                        </div>
                        <div class="col col-2">
                            <p class="Title-text">${movie.Title}</p>
                            <p class="Year-text">${movie.Year}</p>
                            <p class="Type-text">${movie.Type}</p>
                        </div>
        </div>
                </div>
                
            </div>`

            const popupNode = containerNode.querySelector('.js-popup');
            popupNode.classList.add('popup_open');
        })

    }
});