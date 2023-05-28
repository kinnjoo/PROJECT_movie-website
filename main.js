const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDMwZWRmMWNlZGQzZGQ4ODUwMWYwNGQ4YzQwNmEzYiIsInN1YiI6IjY0NzA4ZTY5NzcwNzAwMDBmYzAyNTM1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A1ljtMKfFX7Gq9Xrj5oyk_KiEE1-JIcVp3LvQrHCsHE'
    }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then((data) => {
        // 영화 목록
        let movieList = data['results']

        movieList.forEach((a) => {
            let poster_path = a['poster_path']
            let title = a['title']
            let overview = a['overview']
            let vote_average = a['vote_average']
            let id = a['id']
            const movieBox = document.getElementById("movieBox");
            // console.dir(movieBox.innerHTML);

            document.getElementById("movieBox").innerHTML =
                `<div class="movieBox">
                    <img src="https://image.tmdb.org/t/p/w500/${poster_path}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${overview}</p>
                        <p>${vote_average}</p>
                    </div>
                </div>`
        })
    })
    .catch(err => console.error(err));