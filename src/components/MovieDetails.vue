<script setup lang="ts">
import type { Movie } from '../interfaces/interfaces'
import { hoursAndMinutes, getPersons } from '../functions/function'

const props = defineProps<{
  selectedMovie: Movie,
  isMovieTabDetail: boolean,
  isHideButtonClick: boolean,
  isPortrait: boolean,
}>()
const emit = defineEmits<{ (e: 'movieDetailHide'): void }>()

// const movieTag = ref<HTMLDivElement | null>(null)
// const onMovieButtonClick = () => {
//   nextTick(() => {
//     if (movieTag.value?.classList.contains('movie-resize-hide')) {
//       movieTag.value?.classList.remove('movie-resize-hide')
//     }

//     movieTag.value?.classList.add('movie-hide-click')
//   })
// }
</script>

<template>
  <section
    class="movie"
    :class="{
      'movie-show': isPortrait && props.isMovieTabDetail,
      'movie-hide-click': isPortrait && props.isHideButtonClick,
    }"
    ref="movieTag"
  >
    <button
      type="button"
      class="movie-details-hide"
      :class="{ hide: !isPortrait }"
      @click="emit('movieDetailHide')"
    >
      <img src="../assets/images/vector-left.svg" alt="Hide button"/>
    </button>
    <div class="movie-block">
      <figure
        class="movie-image"
        :style="{
          backgroundImage: `linear-gradient(180deg, rgba(22, 22, 22, 0) 47.99%, #161616 100%), url(${props.selectedMovie.bg_picture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }"
      ></figure>
      <div class="movie-main-info">
        <div class="movie-details">
          <button
            type="button"
            class="movie-details-trailer"
          >
            <img src="../assets/images/play.svg" alt="play-button"/>
            <span>Watch trailer</span>
          </button>
          <div class="movie-details-name">
              <span>{{ props.selectedMovie.title }}</span>
              <span class="movie-details-name-release">
                {{ `(${props.selectedMovie.release_year})` }}
              </span>
          </div>
          <div class="movie-details-description">
            {{ props.selectedMovie.description }}
          </div>
          <div class="movie-details-info">
            <span class="movie-details-info-genres">
              {{ props.selectedMovie.genres.map(genre => genre.title).join(', ') }}
            </span>
            <span class="movie-details-info-delimiter">|</span>
            <span class="movie-details-info-mpa-rating">
              {{ props.selectedMovie.mpa_rating }}
            </span>
            <span class="movie-details-info-delimiter">|</span>
            <span class="movie-details-info-duration">
              {{ hoursAndMinutes(props.selectedMovie.duration) }}
            </span>
          </div>
          <div class="movie-details-imdb">
            <p class="movie-details-imdb-text">IMDb rating</p>
            <img src="../assets/images/imdb-star.svg" alt="imdb-star" />
            <span class="movie-details-imdb-rating">
              {{ ` ${props.selectedMovie.imdb_rating}` }}
            </span>
            <span class="movie-details-imdb-max-raiting">/10</span>
          </div>
        </div>
        <div class="movie-persons">
          <div v-if="props.selectedMovie.directors.length" class="movie-persons-director">
            <span class="movie-persons-position">{{ 'Direstors: ' }}</span>
            <span class="movie-persons-partisipants">{{ getPersons(props.selectedMovie.directors) }}</span>
          </div>
          <div v-if="props.selectedMovie.writers.length" class="movie-persons-writers">
            <span class="movie-persons-position">{{ 'Writers: ' }}</span>
            <span class="movie-persons-partisipants">{{ getPersons(props.selectedMovie.writers) }}</span>
          </div>
          <div v-if="props.selectedMovie.stars.length" class="movie-persons-stars">
            <span class="movie-persons-position">{{ 'Stars: ' }}</span>
            <span class="movie-persons-partisipants">{{ getPersons(props.selectedMovie.stars) }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>

</style>
