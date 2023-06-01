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

        // 영화 목록을 표시
        function showList(val = '') {
            // movieList에 데이터 입력
            list.innerHTML = "";

            movieList.forEach(movie => {
                let poster_path = movie['poster_path'];
                let title = movie['title'];
                let overview = movie['overview'];
                let vote_average = movie['vote_average'];
                let id = movie['id'];

                // 검색하면(검색 값이 있을경우) 해당 title의 영화가 movieCard라는 새로운 div 하위요소에 생성
                // 대소문자 구별 없이 검색가능
                if (title.toLowerCase().includes(val.toLowerCase())) {
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
                }
            });
        }

        showList();

        // input박스, 검색버튼 DOM 설정
        const searchInput = document.getElementById("searchInput");
        const searchBtn = document.getElementById("searchBtn");

        // input박스에 검색어 입력 후 버튼 클릭시 입력 값 showList 실행
        searchBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const val = searchInput.value;
            showList(val);
        })
    })
    .catch(err => console.error(err));

// 영화카드 클릭시 id값 alert 창으로 띄우기
const movieId = id => alert(`영화 id : ${id}`);