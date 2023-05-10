export interface Movie {
  id: number,
  title: string,
  description: string,
  release_year: number,
  mpa_rating: "G" | "PG" | "PG-13" | "R" | "NC-17",
  imdb_rating: number,
  duration: number,
  poster: string,
  bg_picture: string
  genres: Genre[],
  directors: Person[],
  writers: Person[],
  stars: Person[],
}

export interface Genre {
  id: number,
  title: string,
}

export interface Person {
  id: number,
  first_name: string,
  last_name: string,
}

export interface MoviesPage {
  pages: number,
  results: Movie[],
  total: number,
}
