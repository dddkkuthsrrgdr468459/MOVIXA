const movies = [
  {
    title: "Inception",
    year: "2010",
    genre: "علمی‌تخیلی",
    rating: "8.8",
    desc: "یک تریلر علمی‌تخیلی درباره رویا و واقعیت."
  },
  {
    title: "Interstellar",
    year: "2014",
    genre: "علمی‌تخیلی",
    rating: "8.7",
    desc: "سفری بزرگ برای یافتن آینده‌ای برای بشر."
  },
  {
    title: "The Dark Knight",
    year: "2008",
    genre: "اکشن",
    rating: "9.0",
    desc: "مبارزه‌ای میان بتمن و یک دشمن خطرناک."
  },
  {
    title: "The Conjuring",
    year: "2013",
    genre: "ترسناک",
    rating: "7.5",
    desc: "یک پرونده ماورایی در خانه‌ای قدیمی."
  },
  {
    title: "Free Guy",
    year: "2021",
    genre: "کمدی",
    rating: "7.1",
    desc: "مردی معمولی متوجه می‌شود در یک بازی زندگی می‌کند."
  },
  {
    title: "Dune",
    year: "2021",
    genre: "ماجراجویی",
    rating: "8.0",
    desc: "داستانی حماسی در سیاره‌ای دوردست."
  },
  {
    title: "The Notebook",
    year: "2004",
    genre: "عاشقانه",
    rating: "7.8",
    desc: "داستانی عاشقانه درباره خاطره و انتخاب."
  },
  {
    title: "Joker",
    year: "2019",
    genre: "درام",
    rating: "8.3",
    desc: "داستان شکل‌گیری یک شخصیت مشهور و پیچیده."
  }
];

const movieGrid = document.getElementById("movieGrid");
const rankGrid = document.getElementById("rankGrid");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("recommendModal");
const result = document.getElementById("recommendResult");

function renderMovies(list = movies) {
  if (!movieGrid) return;

  if (list.length === 0) {
    movieGrid.innerHTML =
      '<div class="empty">فیلمی پیدا نشد.</div>';
    return;
  }

  movieGrid.innerHTML = list.map((movie) => 
    <article class="movie-card">
      <div
        class="poster"
        style="background:linear-gradient(145deg,#24134c,#090914)"
      >
        <span class="rating">★ ${movie.rating}</span>

        <div class="poster-content">
          <div class="poster-title">${movie.title}</div>
          <div class="meta">
            ${movie.year} • ${movie.genre}
          </div>
        </div>
      </div>

      <div class="movie-info">
        <p>${movie.desc}</p>
      </div>
    </article>
  ).join("");
}

function renderRanks() {
  if (!rankGrid) return;

  const sortedMovies = [...movies]
    .sort((a, b) => Number(b.rating) - Number(a.rating))
    .slice(0, 5);

  rankGrid.innerHTML = sortedMovies.map((movie, index) => 
    <article class="rank">
      <span class="rank-num">${index + 1}</span>

      <div
        class="poster"
        style="background:linear-gradient(145deg,#24134c,#090914)"
      >
        <span class="rating">★ ${movie.rating}</span>

        <div class="poster-content">
          <div class="poster-title">
            ${movie.title}
          </div>
        </div>
      </div>

      <div class="movie-info">
        <p>${movie.year} • ${movie.genre}</p>
      </div>
    </article>
  ).join("");
}

function filterGenre(genre, button) {
  document
    .querySelectorAll(".genre")
    .forEach(btn => btn.classList.remove("active"));

  if (button) {
    button.classList.add("active");
  }

  const filteredMovies =
    genre === "همه"
      ? movies
      : movies.filter(movie => movie.genre === genre);

  renderMovies(filteredMovies);

  const moviesSection = document.getElementById("movies");

  if (moviesSection) {
    moviesSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function searchMovies() {
  const searchText =
    (searchInput?.value || "").trim().toLowerCase();

  const filteredMovies = movies.filter(movie =>
    ${movie.title} ${movie.genre} ${movie.year} ${movie.desc}
      .toLowerCase()
      .includes(searchText)
  );

  renderMovies(filteredMovies);
}

function recommend() {
  if (!modal || !result) return;

  const movie =
    movies[Math.floor(Math.random() * movies.length)];

  result.innerHTML = `
    <div class="result">
      <div class="side-icon">🎬</div>

      <h2>${movie.title}</h2>

      <div class="big-rating">
        ★ ${movie.rating}
      </div><p>${movie.desc}</p>

      <p>
        <strong>${movie.year}</strong>
        • ${movie.genre}
      </p>
    </div>
  `;

  modal.classList.add("show");
}

function closeModal() {
  if (modal) {
    modal.classList.remove("show");
  }
}

function focusSearch() {
  if (!searchInput) return;

  searchInput.focus();

  searchInput.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

document.addEventListener("click", function(event) {
  if (event.target === modal) {
    closeModal();
  }
});

renderMovies();
renderRanks();
