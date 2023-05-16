<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Movie } from '../interfaces/interfaces'
import MovieListCard from './MovieListCard.vue'
import { splitIntoChunks } from '../functions/function'

type Props = {
  moviesList: Movie[];
  selectedMovieId: number;
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'movieSelect', movieId: number): void
}>()

const shift = ref<number>(0)
const moviesCountOnScreen = ref<number>(6)
const liWidth = 144
const shiftStep = 1

const moviesPagesArray = ref<Movie[][]>(splitIntoChunks(props.moviesList, moviesCountOnScreen.value))
const totalPages = ref<number>(Math.ceil(props.moviesList.length / moviesCountOnScreen.value))
const currentPage = ref<number>(0)
const moviesPagesList = ref<Movie[]>(moviesPagesArray.value[currentPage.value])

watch(
  () => currentPage.value,
  (page: number) => {
    if (page < totalPages.value) {
      moviesPagesList.value = [...moviesPagesList.value, ...moviesPagesArray.value[page]]

      if (page === totalPages.value - 1) {
        moviesCountOnScreen.value++
        next(liWidth, moviesCountOnScreen.value, moviesPagesList.value.length, moviesCountOnScreen.value)

        return
      }

      next(liWidth, moviesCountOnScreen.value, moviesPagesList.value.length, moviesCountOnScreen.value)
    }
  }
)

// const moviesOnScreen = computed<Movie[]>({
//   get: () => moviesPagesList.value,
//   set: (moviesPagesArray: Movie[]) => {
//     moviesPagesList.value = [...moviesPagesList.value, ...moviesPagesArray]
//   }
// })
// watch(
//   () => currentPage.value,
//   (page: number) => {
//     moviesOnScreen.value = moviesPagesArray.value[page]
//   }
// )

const onAddNewPage = (): void => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prev = (widthItem: number, step: number): void => {
  const shiftOfStep = widthItem * step

  if (shift.value === 0) {
    return
  } else {
    shift.value = Math.min(shift.value + shiftOfStep, 0)
  }
}

const next = (widthItem: number, step: number, itemsListLength: number, itemsOnScreen: number): void => {
  const maxShift = widthItem * (itemsListLength - itemsOnScreen)
  const shiftOfStep = widthItem * step

  if (shift.value === (-maxShift)) {
    return
  } else {
    shift.value = Math.max(shift.value - shiftOfStep, -maxShift)
  }
}

// const liRefs = ref<HTMLLIElement[]>([])
// const next = () => {
//   liRefs.value[10]?.scrollIntoView({ block: 'end', behavior: 'smooth' })
// }
</script>

<template>
  <section class="list-control">
    <button
      type="button"
      class="list-control-button"
      @click="prev(liWidth, shiftStep)"
    >
      <img src="../assets/images/arrow-prev.svg" alt="Arrow-next" class="list-control-button-arrow" />
    </button>
    <div class="list-pages-container">
      <div
        class="list-container"
        :style="{ '--li-viewed-movies-count': moviesCountOnScreen }"
      >
        <ul
          class="list-container-ul"
          :style="{
            '--li-count': moviesPagesList.length,
            '--shift': `${shift}px`,
          }"
        >
          <li
              v-for="movie in moviesPagesList"
              :key="movie.id"
              class="list-container-ul-item"
              ref="liRefs"
          >
            <MovieListCard
              :selected-movie="props.selectedMovieId === movie.id"
              :poster="movie.poster"
              :imdb-rating="movie.imdb_rating"
              :title="movie.title"
              @click="() => emit('movieSelect', movie.id)"
            />
          </li>
        </ul>
      </div>
      <div
        class="list-pages-container-view-more"
        :class="{ hide: currentPage >= totalPages - 1 }"
      >
        <button
          type="button"
          class="list-pages-container-view-more-button"
          @click="onAddNewPage"
        >
          <img class="list-pages-container-view-more-button-plus" src="../assets/images/plus_icon.svg"/>
          <p class="list-pages-container-view-more-button-text">View more</p>
        </button>
      </div>
    </div>
    <button
      type="button"
      class="list-control-button"
      @click="next(liWidth, shiftStep, moviesPagesList.length, moviesCountOnScreen)"
    >
      <img src="../assets/images/arrow-next.svg" alt="Arrow-next" class="list-control-button-arrow" />
    </button>
  </section>
</template>

<style>
</style>
