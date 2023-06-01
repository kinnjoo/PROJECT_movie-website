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
        // 전체 영화 목록
        let movieList = data['results'];

        const list = document.getElementById('movieBox');

        // 영화 카드 표시
        function showList(movies) {
            list.innerHTML = '';

            movies.forEach(movie => {
                let poster_path = movie['poster_path'];
                let title = movie['title'];
                let overview = movie['overview'];
                let vote_average = movie['vote_average'];
                let id = movie['id'];

                const movieElement = document.createElement("div");
                movieElement.className = "movieCard";
                movieElement.innerHTML = `
                    <div onclick="movieId(${id})">
                        <img src="https://image.tmdb.org/t/p/w300/${poster_path}">
                        <p>${title}</p>
                        <p>${overview}</p>
                        <p>Rating : ${vote_average}</p>
                    </div>
                `;
                list.appendChild(movieElement);
            });
        }
        showList(movieList);

        // input박스, 검색버튼 DOM 설정
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');

        // input박스에 검색어 입력 후 버튼 클릭시 함수 searchMovie 실행
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const val = searchInput.value;
            searchMovie(val);
        });

        // 영화 검색시 해당 영화만 화면에 표시
        function searchMovie(val) {
            const filteredMovies = movieList.filter(movie =>
                movie['title'].toLowerCase().includes(val.toLowerCase()));
            showList(filteredMovies);
        }
    })
    .catch(err => console.error(err));

// 영화 카드 클릭시 id값 alert 창으로 띄우기
const movieId = id => alert(`영화 id : ${id}`);