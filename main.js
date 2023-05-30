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
        // 영화 목록
        let movieList = data['results'];

        const list = document.getElementById('movieBox');

        // 영화 목록을 표시
        function showList(val = '') {
            // movieBox 내용 지우고 forEach문으로 movieList 데이터입력
            list.innerHTML = "";

            movieList.forEach(movie => {
                let poster_path = movie['poster_path'];
                let title = movie['title'];
                let overview = movie['overview'];
                let vote_average = movie['vote_average'];
                let id = movie['id'];

                // 검색하면(검색 값이 있을경우) list에 추가 -> 검색 결과 출력
                if (title.toLowerCase().includes(val.toLowerCase())) {
                    const movieElement = document.createElement("div");
                    movieElement.className = "movieCard";
                    movieElement.innerHTML = `
                        <img src="https://image.tmdb.org/t/p/w300/${poster_path}" onclick="movieId(${id})">
                        <p>${title}</p>
                        <p>${overview}</p>
                        <p>${vote_average}</p>
                    `;
                    list.appendChild(movieElement);
                }
            });
        }

        showList();

        const searchInput = document.getElementById("searchInput");
        const searchBtn = document.getElementById("searchBtn");

        // 검색 버튼
        searchBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const val = searchInput.value;
            showList(val);
        })
    })
    .catch(err => console.error(err));

// 영화이미지 클릭시 id값 alert 창으로 띄우기
const movieId = id => alert(`영화 id : ${id}`);