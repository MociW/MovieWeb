const GoKey = document.querySelector('input');
GoKey.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        const titleMovie = e.target.value;
        document.querySelector('h1').innerHTML = "Search: " + titleMovie;
        Promise.all([
                fetch(`http://www.omdbapi.com/?apikey=237fdb6f&s=${titleMovie}&page=1`),
                fetch(`http://www.omdbapi.com/?apikey=237fdb6f&s=${titleMovie}&page=2`),
                fetch(`http://www.omdbapi.com/?apikey=237fdb6f&s=${titleMovie}&page=3`),
            ]).then(async ([aa, bb, cc]) => {
                const a = await aa.json()
                const b = await bb.json();
                const c = await cc.json();
                return ([a, b, c])
            })
            .then(([a, b, c]) => {
                const aw = a.Search;
                const bw = b.Search;
                const cw = c.Search;
                const all = aw.concat(bw, cw);
                let cards = ''
                all.forEach(i => cards += cardContainer(i))
                const movieCard = document.querySelector('.movie-container')
                movieCard.innerHTML = cards

                const modalDetailButton = document.querySelectorAll('.detail-Movie-Modal')
                modalDetailButton.forEach(i => {
                    i.addEventListener('click', function () {
                        const imdbid = this.dataset.imdbid;
                        fetch('http://www.omdbapi.com/?apikey=237fdb6f&i=' + imdbid).then(res => res.json()).then(res => {
                            const movieDetail = modalContainer(res)
                            const modalBody = document.querySelector('.modal-body')
                            modalBody.innerHTML = movieDetail
                        })
                    })
                })
            })
    }
})

// const GoKey = document.querySelector('input');
// GoKey.addEventListener('keyup', function (e) {
//     if (e.key === 'Enter') {
//         const titleMovie = e.value
//         fetch(`http://www.omdbapi.com/?apikey=237fdb6f&s=${titleMovie}&page=1`).then(res => res.json()).then(res => {
//             // const movies = res.Search;
//             // let cards = '';
//             // movies.forEach(i => cards += cardContainer(i));
//             // const movieCard = document.querySelector('.movie-container')
//             // movieCard.innerHTML = cards
//             console.log(res);
//         })
//     }
// })


function cardContainer(i) {
    return `<div class="col-6 col-lg-2 col-md-6">
                <div class="card border-0">
                    <a class="detail-Movie-Modal" data-bs-toggle="modal" data-bs-target="#exampleModal" data-imdbid="${i.imdbID}"><img src="${i.Poster}" class="card-img-top rounded"></a>
                    <p class="mt-2">${i.Title} (${i.Year})</p>
                </div>
            </div>`
}

function modalContainer(i) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${i.Poster}" alt="" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"> <strong>${i.Title} (${i.Year})</strong></li>
                            <li class="list-group-item"><strong>Director:</strong> ${i.Director}</li>
                            <li class="list-group-item"><strong>Actor:</strong> ${i.Actors}</li>
                            <li class="list-group-item">${i.Plot}</li>
                            <li class="list-group-item"><strong>IMDB Rating:</strong> ${i.imdbRating}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>`
}