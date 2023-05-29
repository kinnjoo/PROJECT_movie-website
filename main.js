const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDMwZWRmMWNlZGQzZGQ4ODUwMWYwNGQ4YzQwNmEzYiIsInN1YiI6IjY0NzA4ZTY5NzcwNzAwMDBmYzAyNTM1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A1ljtMKfFX7Gq9Xrj5oyk_KiEE1-JIcVp3LvQrHCsHE'
    }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(data => {
        // 영화 목록 확인
        console.log(data['results']);
        let movieList = data['results'];

        movieList.forEach((Movie) => {
            let poster_path = Movie['poster_path'];
            let title = Movie['title'];
            let overview = Movie['overview'];
            let vote_average = Movie['vote_average'];

            const movieElement = document.createElement("movieBox");
            movieElement.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500/${poster_path}">
                <p>${title}</p>
                <p>${overview}</p>
                <p>${vote_average}</p>
            `;

            movieBox.appendChild(movieElement);
        })
    })
    .catch(err => console.error(err));