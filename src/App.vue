<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import type { Movie, MoviesPage } from './interfaces/interfaces'
import MovieDetails from './components/MovieDetails.vue'
import MoviesList from './components/MoviesList.vue'
import { getMovies } from './api/api'

const serverData = ref<MoviesPage>({
  pages: 0,
  total: 0,
  results: [],
})
const selectedMovie = ref<Movie>({
  id: 0,
  title: '',
  description: '',
  release_year: 0,
  mpa_rating: 'G',
  imdb_rating: 0,
  duration: 0,
  poster: '',
  bg_picture: '',
  genres: [],
  directors: [],
  writers: [],
  stars: [],
})
const isMovieTabDetail = ref<boolean>(false)
const isHideButtonClick = ref<boolean>(false)
const screenWidth = ref<number>(window.innerWidth)

const handleResize = (): void => {
  screenWidth.value = window.innerWidth
}
const onMovieSelect = (movieId: number): void => {
  const findSelectedMovie = serverData.value.results.find(movie => movie.id === movieId);

  if (findSelectedMovie !== undefined) {
    selectedMovie.value = findSelectedMovie
    isMovieTabDetail.value = true
    isHideButtonClick.value = false
  } else {
    throw new Error('Movie not found')
  }
}

watch(
  () => screenWidth.value,
  (value: number) => {
    if (value > 900) {
      isHideButtonClick.value = false
    }
  }
)

onMounted(async () => {
  window.addEventListener('resize', handleResize)
  serverData.value = await getMovies('/api/v1/movies/')

  if (selectedMovie.value.id === 0) {
    selectedMovie.value = serverData.value.results[0]
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <main
    v-if="serverData.results.length !== 0"
    :class="{
      'movies-laptop-page': screenWidth >= 1152,
      'tablet-landscape-page': screenWidth < 1152 && screenWidth >= 900,
      'tablet-portrait-page': screenWidth < 900
    }"
  >
    <MoviesList
      :is-portrait="screenWidth < 900"
      :is-laptop="screenWidth >= 1152"
      :movies-list="serverData.results"
      :selected-movie-id="selectedMovie.id"
      @movie-select="onMovieSelect"
    />
    <MovieDetails
      :class="{ 'movie-resize-hide': screenWidth < 900
        && (isMovieTabDetail === false && isHideButtonClick === false) ? true : false
      }"
      :selected-movie="selectedMovie"
      :is-movie-tab-detail="isMovieTabDetail"
      :is-hide-button-click="isHideButtonClick"
      :is-portrait="screenWidth < 900"
      @movie-detail-hide="() => {
        isMovieTabDetail = false
        isHideButtonClick = true
      }"
    />
  </main>
</template>

<style>
.movies-laptop-page {
  position: relative;
  display: block;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #161616;
}

.tablet-landscape-page {
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #161616;
}

.tablet-portrait-page {
  position: relative;
  display: block;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #161616;
}

.movie-resize-hide {
  transform: translateX(-100%);
}

.hide {
  display: none;
}
</style>
